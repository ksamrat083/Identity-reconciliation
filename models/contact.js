module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    linkPrecedence: {
      type: DataTypes.ENUM('primary', 'secondary'),
      allowNull: false,
      defaultValue: 'primary'
    }
  }, {
    timestamps: true,
    paranoid: true // for soft deletes (adds deletedAt)
  });
};
