const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const vendorRoutes = require("./routes/vendor.routes");
const requestLogger = require("./middleware/request.middleware");
const errorMiddleware = require("./middleware/error.middleware");
const logger = require("./utils/logger");

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());

app.use(morgan("combined", { stream: logger.stream }));

app.get("/health", (req, res) => {

    res.json({
        service: "vendor-service",
        status: "running",
        timestamp: new Date()
    });

});

app.use("/api/vendors", vendorRoutes);
app.use(requestLogger);
app.use(errorMiddleware);

module.exports = app;