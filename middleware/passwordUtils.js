const bcrypt = require("bcrypt");

const hashPassword = async (pass, saltRounds) => await bcrypt.hash(pass, saltRounds);
const comparePassword = async (reqPass, savedPass) => await bcrypt.compare(reqPass, savedPass);

module.exports = {hashPassword, comparePassword};
