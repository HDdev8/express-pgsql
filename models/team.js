const {DataTypes} = require("sequelize");
const {sequelize} = require("../utils/db");

const Team = sequelize.define(
  "team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

module.exports = Team;
