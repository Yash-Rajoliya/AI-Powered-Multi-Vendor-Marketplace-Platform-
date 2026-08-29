const repository = require("../repositories/inventory.repository");
const cache = require("../cache/inventory.cache");
const { publishInventoryEvent } = require("../events/inventory.publisher");
const { NotFoundError, BadRequestError } = require("../utils/errors");

class InventoryService {

    async updateStock(productId, quantity) {
        const inventory = await repository.updateStock(productId, quantity);

        if (!inventory) {
            throw new NotFoundError("Inventory not found or insufficient stock to perform decrement");
        }

        await cache.invalidate(productId);

        await publishInventoryEvent("inventory.updated", inventory);

        return inventory;
    }

    async checkStock(productId) {
        const cached = await cache.get(productId);

        if (cached) return cached;

        const inventory = await repository.findByProduct(productId);

        if (!inventory) throw new NotFoundError("Inventory not found");

        await cache.set(productId, inventory);

        return inventory;
    }

    async reserveInventory(productId, quantity) {
        if (quantity <= 0) {
            throw new BadRequestError("Reservation quantity must be greater than zero");
        }

        const inventory = await repository.reserveStock(productId, quantity);

        if (!inventory) {
            const existing = await repository.findByProduct(productId);
            if (!existing) {
                throw new NotFoundError("Inventory not found");
            }
            throw new BadRequestError("Insufficient available stock to complete reservation");
        }

        await cache.invalidate(productId);

        await publishInventoryEvent("inventory.reserved", {
            productId,
            quantity
        });

        return inventory;
    }

}

module.exports = new InventoryService();