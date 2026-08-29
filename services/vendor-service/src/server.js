require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");
const { connectRabbitMQ } = require("./events/vendor.events");

const PORT = process.env.PORT || 4003;

async function startServer() {

    await connectDatabase();

    await connectRabbitMQ();

    app.listen(PORT, () => {

        console.log(`Vendor service running on port ${PORT}`);

    });

}

startServer();