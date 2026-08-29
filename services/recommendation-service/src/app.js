const express = require("express");
const routes = require("./routes/recommendation.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/health",(req,res)=>{
res.json({service:"recommendation-service",status:"ok"});
});

app.use("/api/recommendations",routes);

app.use(errorMiddleware);

module.exports = app;