const User = require("../models/user");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    if (user.role === "admin") {
      next();
    } else res.status(401).send({error: "operation not allowed"});
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
