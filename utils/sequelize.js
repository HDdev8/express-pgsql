const Sequelize = require("sequelize");
const {Umzug, SequelizeStorage} = require("umzug");
const config = require("../config/config");
const logger = require("../logger/logger");

const sequelize = new Sequelize(config.DB, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialect: "postgres",
});

const migrationConf = {
  migrations: {glob: "migrations/*.js"},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize, tableName: "migrations"}),
};

const migrationUp = async () => {
  try {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.up();
    logger.info("Migrations up to date", {
      files: migrations.map((m) => m.name),
    });
  } catch (error) {
    logger.error(`Error running migration: ${error}`);
  }
};

const migrationDown = async () => {
  try {
    await sequelize.authenticate();
    const migrator = new Umzug(migrationConf);
    const migrations = await migrator.down();
    logger.info("Migrations removed", {
      files: migrations.map((m) => m.name),
    });
  } catch (error) {
    logger.error(`Error rolling back migration: ${error}`);
  }
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info(`connected to the database`);
  } catch (err) {
    logger.error(`failed to connect to the database: ${err}`);
    process.exitCode = 1;
  }
  return null;
};

module.exports = {
  connectToDatabase,
  sequelize,
  migrationUp,
  migrationDown,
};
