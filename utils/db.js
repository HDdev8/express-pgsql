const Sequelize = require("sequelize");
const {Umzug, SequelizeStorage} = require("umzug");
const config = require("../config/config");
// const logger = require("../logger/logger");

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
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({sequelize, tableName: "migrations"}),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to the database");
  } catch (err) {
    console.log(`failed to connect to the database: ${err}`);
    process.exitCode = 1;
  }
  return null;
};

module.exports = {
  connectToDatabase,
  sequelize,
  rollbackMigration,
};
