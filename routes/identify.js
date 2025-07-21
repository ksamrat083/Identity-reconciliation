const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../models');

router.post('/', async (req, res) => {
  const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Email or phone number required" });
  }

  const contactMatches = await db.Contact.findAll({
    where: {
      [Op.or]: [
        email ? { email } : {},
        phoneNumber ? { phoneNumber } : {}
      ]
    },
    order: [['createdAt', 'ASC']]
  });

  let primaryContact = null;

  if (contactMatches.length === 0) {
    // Create new primary
    primaryContact = await db.Contact.create({ email, phoneNumber, linkPrecedence: 'primary' });
  } else {
    // Find primary among matches
    primaryContact = contactMatches.find(c => c.linkPrecedence === 'primary') || contactMatches[0];

    // Check if contact with both email and phone doesn't exist already
    const exactMatch = contactMatches.find(c => c.email === email && c.phoneNumber === phoneNumber);
    if (!exactMatch && (email || phoneNumber)) {
      await db.Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      });
    }

    // Handle merging multiple primaries
    const primaries = contactMatches.filter(c => c.linkPrecedence === 'primary');
    if (primaries.length > 1) {
      const oldest = primaries[0];
      for (let i = 1; i < primaries.length; i++) {
        if (primaries[i].id !== oldest.id) {
          await primaries[i].update({
            linkPrecedence: 'secondary',
            linkedId: oldest.id
          });
        }
      }
      primaryContact = oldest;
    }
  }

  // Fetch all linked contacts
  const allContacts = await db.Contact.findAll({
    where: {
      [Op.or]: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id }
      ]
    }
  });

  const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];
  const secondaryContactIds = allContacts
    .filter(c => c.linkPrecedence === 'secondary')
    .map(c => c.id);

  res.json({
    contact: {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    }
  });
});

module.exports = router;
