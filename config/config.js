const path = require("node:path");
require("dotenv").config({path: path.resolve(__dirname, "./.env")});

const PORT = process.env.PORT || 3001;
const DB = process.env.DB;
const SECRET = process.env.SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_NAME = process.env.SESSION_NAME;

module.exports = {
  PORT,
  DB,
  SECRET,
  SESSION_SECRET,
  SESSION_NAME,
};
