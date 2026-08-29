const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/marketplace";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to DB");

    const products = [
      {
        title: "iPhone 15",
        price: 1200,
        stock: 10,
        category: "electronics",
      },
      {
        title: "Nike Shoes",
        price: 150,
        stock: 50,
        category: "fashion",
      },
    ];

    const Product = mongoose.model(
      "Product",
      new mongoose.Schema({}, { strict: false })
    );

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();