const express = require("express");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const cors = require("cors");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");
const usersRouter = require("./controllers/users");
const postsRouter = require("./controllers/posts");
const authorsRouter = require("./controllers/authors");
const globalErrorHandler = require("./errors/globalErrorHandler");
const logger = require("./logger/logger");

const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) => {
  res.json("Home");
});

app.use("/api/login", loginRouter);
// app.use("/api/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/authors", authorsRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  logger.error(error);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
