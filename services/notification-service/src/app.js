const express = require("express");
const requestLogger = require("./middleware/request.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ service: "notification-service", status: "running" });
});

app.use(errorMiddleware);

module.exports = app;