const express = require("express");
const cors = require("cors");

const requestLogger = require("./middleware/request.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const setupRoutes = require("./routes");

const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.get("/health", (req,res)=>{
  res.json({status:"API Gateway running"});
});

setupRoutes(app);

app.use(errorMiddleware);

module.exports = app;