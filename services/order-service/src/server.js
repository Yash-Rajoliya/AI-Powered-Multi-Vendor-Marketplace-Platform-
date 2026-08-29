require("dotenv").config();

const app = require("./app");

const connectDatabase = require("./config/database");
const { connectRabbitMQ } = require("./config/rabbitmq");

const startPaymentConsumer =
require("./events/payment.consumer");

const PORT = process.env.PORT || 4005;

async function startServer(){

await connectDatabase();

await connectRabbitMQ();

await startPaymentConsumer();

app.listen(PORT,()=>{
console.log(`Order service running on ${PORT}`);
});

}

startServer();