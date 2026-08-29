const vendorRepository = require("../repositories/vendor.repository");
const { publishVendorEvent } = require("../events/vendor.events");
const redisCache = require("../config/redis");
const slugify = require("slugify");
const logger = require("../utils/logger");

class VendorService {

    async onboardVendor(data) {

        const existing = await vendorRepository.findByOwner(data.ownerId);

        if (existing) {
            throw new Error("Vendor already exists for this owner");
        }

        const slug = slugify(data.vendorName, { lower: true });

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

        if (!vendor) throw new Error("Vendor not found");

        await redisCache.set(cacheKey, vendor, 300);

        return vendor;
    }

    async updateVendorStore(vendorId, updateData) {

        const vendor = await vendorRepository.updateVendor(
            vendorId,
            updateData
        );

        await publishVendorEvent("vendor.updated", vendor);

        await redisCache.del(`vendor:profile:${vendor.ownerId}`);

        return vendor;
    }

    async listVendors(queryParams) {

        const { page = 1, limit = 10 } = queryParams;

        const skip = (page - 1) * limit;

        return vendorRepository.listVendors(
            { isActive: true },
            {
                skip,
                limit,
                sort: { createdAt: -1 }
            }
        );
    }

}

module.exports = new VendorService();