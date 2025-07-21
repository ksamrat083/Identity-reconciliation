# Identity Reconciliation API

A RESTful API built with Node.js and Sequelize to resolve and unify user identities using email and phone number.

🔗 **Live Demo**:  
➡️ [https://identity-reconciliation-uxgz.onrender.com/identify](https://identity-reconciliation-uxgz.onrender.com/identify)

---

## 🔧 Features

- Deduplicates and links contacts using `email` and `phoneNumber`
- Maintains primary–secondary relationships
- Returns a unified response with all associated identifiers

---

## 📦 Tech Stack

- Node.js
- Express.js
- PostgreSQL (via Sequelize ORM)
- Render.com for deployment

---

## 📥 API Usage

### POST `/identify`

#### Request Body (any combination of `email` and/or `phoneNumber`):
```json
{
  "email": "doc@flux.com",
  "phoneNumber": "123456"
}
```
Response:
```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["doc@flux.com", "emmett@brown.com"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [2]
  }
}
```

🚀 Running Locally
1. Clone the repo:
```bash
git clone https://github.com/ksamrat083/Identity-reconciliation.git
cd Identity-reconciliation
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file:
```ini
PORT=3000
DB_URI=your_postgres_connection_string
```
4. Start the server:
```bash
npm start
```

📄 License
MIT © Samrat Kavide
