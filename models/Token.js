const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Token = sequelize.define("Token", {
  isRevoked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = Token;
