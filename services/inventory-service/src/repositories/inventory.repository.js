const Inventory = require("../models/inventory.model");

class InventoryRepository {

    async create(data) {
        return Inventory.create(data);
    }

    async findByProduct(productId) {
        return Inventory.findOne({ productId });
    }

    async updateStock(productId, quantity) {
        // If quantity is negative, ensure totalStock doesn't drop below reservedStock
        const query = { productId };
        if (quantity < 0) {
            query.$expr = {
                $gte: [{ $add: ["$totalStock", quantity] }, "$reservedStock"]
            };
        }

        return Inventory.findOneAndUpdate(
            query,
            { $inc: { totalStock: quantity } },
            { new: true, runValidators: true }
        );
    }

    async reserveStock(productId, quantity) {
        return Inventory.findOneAndUpdate(
            {
                productId,
                $expr: {
                    $gte: [
                        { $subtract: ["$totalStock", { $ifNull: ["$reservedStock", 0] }] },
                        quantity
                    ]
                }
            },
            { $inc: { reservedStock: quantity } },
            { new: true, runValidators: true }
        );
    }

}

module.exports = new InventoryRepository();