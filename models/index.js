const Post = require("./post");
const User = require("./user");
const Team = require("./team");
const Membership = require("./membership");

Post.belongsTo(User);
User.hasMany(Post);
User.belongsToMany(Team, {through: Membership});
Team.belongsToMany(User, {through: Membership});

module.exports = {
  Post,
  User,
  Team,
  Membership,
};
