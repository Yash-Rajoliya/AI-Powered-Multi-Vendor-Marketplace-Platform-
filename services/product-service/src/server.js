require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const connectRedis = require("./config/redis");
const { connectRabbitMQ } = require("./events/product.events");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 4002;

async function startServer() {
    try {

        await connectDatabase();

        await connectRedis();

        await connectRabbitMQ();

        const server = app.listen(PORT, () => {
            logger.info(`Product Service running on port ${PORT}`);
        });

        process.on("SIGTERM", () => {
            logger.info("SIGTERM received. Shutting down...");
            server.close(() => {
                logger.info("Server closed");
            });
        });

    } catch (error) {

        logger.error("Server startup failed", error);

        process.exit(1);

    }
}

startServer();