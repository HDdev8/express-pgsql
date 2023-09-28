const {DataTypes} = require("sequelize");

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn("posts", "content", {
      type: DataTypes.STRING,
      defaultValue: "",
    });
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.removeColumn("posts", "content");
  },
};
