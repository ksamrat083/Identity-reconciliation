const db = require('./models');

db.sequelize.sync({ alter: true }) // use { force: true } only to drop & recreate
  .then(() => {
    console.log('✅ DB synced');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ DB sync failed:', err);
    process.exit(1);
  });
