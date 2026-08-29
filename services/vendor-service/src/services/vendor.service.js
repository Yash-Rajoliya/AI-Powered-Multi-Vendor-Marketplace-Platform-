const vendorRepository = require("../repositories/vendor.repository");
const { publishVendorEvent } = require("../events/vendor.events");
const redisCache = require("../config/redis");
const slugify = require("slugify");
const logger = require("../utils/logger");

class VendorService {

    async onboardVendor(data) {
        // Check if an owner already has a vendor record regardless of active status
        const existing = await vendorRepository.findByOwnerAnyStatus(data.ownerId);

        if (existing) {
            const error = new Error("Vendor already exists for this owner");
            error.statusCode = 409;
            throw error;
        }

        const slug = slugify(data.vendorName, { lower: true, strict: true });

        const vendor = await vendorRepository.createVendor({
            ...data,
            slug
        });

        await publishVendorEvent("vendor.created", vendor);

        logger.info(`Vendor created: ${vendor._id}`);

        return vendor;
    }

    async getVendorProfile(ownerId) {
        const cacheKey = `vendor:profile:${ownerId}`;

        const cached = await redisCache.get(cacheKey);

        if (cached) return cached;

        const vendor = await vendorRepository.findByOwner(ownerId);

        if (!vendor) {
            const error = new Error("Vendor not found");
            error.statusCode = 404;
            throw error;
        }

        await redisCache.set(cacheKey, vendor, 300);

        return vendor;
    }

    async updateVendorStore(vendorId, updateData) {
        const existingVendor = await vendorRepository.findById(vendorId);

        if (!existingVendor) {
            const error = new Error("Vendor not found");
            error.statusCode = 404;
            throw error;
        }

        // Regenerate slug if store/vendor name is updated
        if (updateData.vendorName && updateData.vendorName !== existingVendor.vendorName) {
            updateData.slug = slugify(updateData.vendorName, { lower: true, strict: true });
        }

        const vendor = await vendorRepository.updateVendor(
            vendorId,
            updateData
        );

        await publishVendorEvent("vendor.updated", vendor);

        // Invalidate both vendor ID and owner profile cache entries
        await redisCache.del(`vendor:profile:${vendor.ownerId}`);
        await redisCache.del(`vendor:id:${vendor._id}`);

        return vendor;
    }

    async listVendors(queryParams = {}) {
        const { page = 1, limit = 10 } = queryParams;

        const skip = (Number(page) - 1) * Number(limit);

        return vendorRepository.listVendors(
            { isActive: true },
            {
                skip,
                limit: Number(limit),
                sort: { createdAt: -1 }
            }
        );
    }

}

module.exports = new VendorService();