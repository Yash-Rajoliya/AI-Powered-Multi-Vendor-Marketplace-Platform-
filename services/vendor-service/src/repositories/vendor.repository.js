const Vendor = require("../models/vendor.model");

class VendorRepository {

    async createVendor(data) {
        return Vendor.create(data);
    }

    async findByOwner(ownerId) {
        return Vendor.findOne({ ownerId, isActive: true });
    }

    async findById(id) {
        return Vendor.findById(id);
    }

    async findBySlug(slug) {
        return Vendor.findOne({ slug });
    }

    async updateVendor(id, data) {
        return Vendor.findByIdAndUpdate(id, data, { new: true });
    }

    async listVendors(query, options) {

        return Vendor.find(query)
            .skip(options.skip)
            .limit(options.limit)
            .sort(options.sort);

    }

}

module.exports = new VendorRepository();