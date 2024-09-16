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
exports.sendVendorRequest = sendVendorRequest;
exports.CategoryRequestVendor = CategoryRequestVendor;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
const user_service_1 = require("../../user/user.service");
function sendVendorRequest(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield db_util_1.default.user.findUnique({
                where: { email },
                select: { id: true, fullName: true, role: true, email: true },
            });
            if (!vendor)
                throw new Error("Email does not belong to any user");
            if (vendor.role == "SuperAdmin")
                throw new Error("Admin cannot be registered as user");
            if (vendor.role == "Vendor")
                throw new Error(`You are already a vendor`);
            const vendorData = yield db_util_1.default.vendorRequest.create({
                data: {
                    userId: vendor.id,
                },
            });
            return vendorData;
        }
        catch (error) {
            console.log(error);
        }
    });
}
function CategoryRequestVendor(vendorId, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield (0, user_service_1.getAnyUserById)(vendorId);
            const categoryInfo = yield db_util_1.default.vendorCategoryRequests.create({
                data: {
                    name: data.name,
                    userId: vendor.id,
                },
            });
            return categoryInfo;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
