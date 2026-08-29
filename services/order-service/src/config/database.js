const mongoose = require("mongoose");
const logger = require("../utils/logger");

async function connectDatabase() {

try {

await mongoose.connect(process.env.MONGO_URI, {
autoIndex: true,
serverSelectionTimeoutMS: 5000,
socketTimeoutMS: 45000
});

logger.info("MongoDB connected successfully");

mongoose.connection.on("error",(err)=>{
logger.error("MongoDB error",err);
});

mongoose.connection.on("disconnected",()=>{
logger.warn("MongoDB disconnected");
});

process.on("SIGINT", async () => {
await mongoose.connection.close();
logger.info("MongoDB connection closed due to app termination");
process.exit(0);
});

} catch(error){

logger.error("MongoDB connection failed",error);
process.exit(1);

}

}

module.exports = connectDatabase;