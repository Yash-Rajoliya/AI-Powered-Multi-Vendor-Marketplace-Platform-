require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 4006;

async function start(){

await connectDB();

app.listen(PORT,()=>{
console.log(`Recommendation service running on ${PORT}`);
});

}

start();