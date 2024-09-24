"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalVendorsCount = getTotalVendorsCount;
exports.getAllVendorData = getAllVendorData;
exports.getVendorsByCategoryName = getVendorsByCategoryName;
exports.revertVendor = revertVendor;
exports.deactivatedVendorProducts = deactivatedVendorProducts;
exports.deleteVendorCategoryRequests = deleteVendorCategoryRequests;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function getTotalVendorsCount() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorCount = yield db_util_1.default.user.count({
                orderBy: { id: "desc" },
                where: { role: "Vendor" },
            });
            return vendorCount;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching total vendor count");
        }
    });
}
function getAllVendorData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorsData = yield db_util_1.default.user.findMany({
                orderBy: { id: "desc" },
                where: { role: "Vendor" },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phoneNumber: true,
                    country: true,
                    city: true,
                    vendorCatRequests: { select: { name: true, status: true } },
                },
            });
            if (vendorsData === null)
                throw new Error(`No vendors exist`);
            return vendorsData;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching all vendors data");
        }
    });
}
function getVendorsByCategoryName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const category = yield db_util_1.default.category.findMany({
                where: { name },
                select: {
                    name: true,
                    Product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            vendor: {
                                select: {
                                    id: true,
                                    fullName: true,
                                    email: true,
                                    country: true,
                                    city: true,
                                    vendorCatRequests: {
                                        select: { id: true, name: true, status: true },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (((_a = category[0]) === null || _a === void 0 ? void 0 : _a.Product.length) === 0) {
                return `Category has no products`;
            }
            return category;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching all vendors data");
        }
    });
}
function revertVendor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield db_util_1.default.user.findUnique({
                where: { id },
                select: { role: true },
            });
            if (!vendor || vendor.role !== "Vendor") {
                throw new Error(`Vendor with ID ${id} not found or is not a vendor.`);
            }
            const updatedVendor = yield db_util_1.default.user.update({
                where: { id },
                data: { role: "Customer" },
                select: { id: true, role: true },
            });
            return updatedVendor;
        }
        catch (error) {
            console.error(error);
            throw new Error(`No vendor at ${id}`);
        }
    });
}
function deactivatedVendorProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_util_1.default.product.updateMany({
                where: { vendorId },
                data: { isActive: false },
            });
            if (result.count === 0) {
                throw new Error(`No products found for vendor with ID ${vendorId}`);
            }
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                throw new Error(`Error deactivating products for vendor with ID ${vendorId}: ${error.message}`);
            }
            else {
                console.error("An unexpected error occurred:", error);
                throw new Error("An unexpected error occurred while deactivating products.");
            }
        }
    });
}
function deleteVendorCategoryRequests(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield db_util_1.default.vendorCategoryRequests.deleteMany({
                where: { userId: id },
            });
            if (!vendor)
                throw new Error(`Vendor at ID ${id} does not exist`);
            return vendor;
        }
        catch (error) {
            console.error(error.message);
            throw new Error(`${error.message}`);
        }
    });
}
