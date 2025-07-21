const db = require('./models');

db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection has been established successfully.');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  });
