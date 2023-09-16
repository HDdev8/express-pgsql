const {DataTypes} = require("sequelize");
const {sequelize} = require("../utils/db");

const Membership = sequelize.define(
  "membership",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "users", key: "id"},
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: "teams", key: "id"},
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = Membership;
