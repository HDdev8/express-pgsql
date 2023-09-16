const https = require("node:https");
const fs = require("node:fs");
const config = require("./config/config");
const {connectToDatabase} = require("./utils/db");
const logger = require("./logger/logger");
const app = require("./app");

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("./certs/localhost-key.pem"),
    cert: fs.readFileSync("./certs/localhost.pem"),
  },
  app
);

const startServer = async () => {
  await connectToDatabase();
  httpsServer.listen(config.PORT, () => {
    logger.info(`Server running on https://localhost:${config.PORT}`);
  });
};

startServer();
