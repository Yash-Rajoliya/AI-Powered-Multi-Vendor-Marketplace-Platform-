const vendorService = require("../services/vendor.service");

class VendorController {

    async onboardVendor(req, res, next) {

        try {

            const vendor = await vendorService.onboardVendor({
                ...req.body,
                ownerId: req.user.userId
            });

            res.status(201).json({
                success: true,
                data: vendor
            });

        } catch (error) {
            next(error);
        }

    }

    async getProfile(req, res, next) {

        try {

            const vendor = await vendorService.getVendorProfile(
                req.user.userId
            );

            res.json({
                success: true,
                data: vendor
            });

        } catch (error) {
            next(error);
        }

    }

    async updateStore(req, res, next) {

        try {

            const vendor = await vendorService.updateVendorStore(
                req.params.id,
                req.body
            );

            res.json({
                success: true,
                data: vendor
            });

        } catch (error) {
            next(error);
        }

    }

    async listVendors(req, res, next) {

        try {

            const vendors = await vendorService.listVendors(req.query);

            res.json({
                success: true,
                data: vendors
            });

        } catch (error) {
            next(error);
        }

    }

}

module.exports = new VendorController();