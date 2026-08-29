const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const routes = require("./routes/inventory.routes");
const errorMiddleware = require("./middleware/error.middleware");
const requestLogger = require("./middleware/request.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.get("/health",(req,res)=>{
res.json({service:"inventory-service",status:"running"});
});

app.use("/api/inventory",routes);

app.use(errorMiddleware);

module.exports = app;