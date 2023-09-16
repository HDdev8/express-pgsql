const {SECRET} = require("../config/config");
const jwt = require("jsonwebtoken");

const tokenExtractor = async (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      req.decodedToken = await jwt.verify(authorization.substring(7), SECRET);
    } else {
      return res.status(401).json({error: "user token missing"});
    }
  } catch (error) {
    next(error);
  }
  next();
};

module.exports = tokenExtractor;
