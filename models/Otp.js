const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Otp = sequelize.define("Otp", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRevoked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Otp;
