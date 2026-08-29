const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDatabase() {

    try {

        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        logger.info(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {

        logger.error("MongoDB connection failed", error);

        process.exit(1);

    }
}

module.exports = connectDatabase;