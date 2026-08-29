const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./utils/logger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: logger.stream }));

app.get("/health", (req, res) => {
    res.status(200).json({
        service: "auth-service",
        status: "running",
        timestamp: new Date()
    });
});

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

module.exports = app;