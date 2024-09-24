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
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function sendVendorRequest(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendor = yield db_util_1.default.user.findUnique({
                where: { email },
                select: { id: true, fullName: true, role: true, email: true },
            });
            if (!vendor)
                throw new Error("Email does not belong to any user");
            if (vendor.role === "SuperAdmin")
                throw new Error("Admin cannot be registered as vendor");
            if (vendor.role === "Vendor")
                throw new Error("You are already a vendor");
            const existingRequest = yield db_util_1.default.vendorRequest.findFirst({
                where: { userId: vendor.id },
            });
            if (existingRequest && existingRequest.status === "pending") {
                throw new Error("Your request has been registered and is under approval, cannot make a new request");
            }
            if (existingRequest && existingRequest.status === "reject") {
                throw new Error("Your request was rejected");
            }
            if (existingRequest &&
                existingRequest.status === "accepted" &&
                vendor.role === "Customer") {
                throw new Error("This User is blocked to be a vendor");
            }
            const vendorData = yield db_util_1.default.vendorRequest.create({
                data: {
                    userId: vendor.id,
                },
            });
            return vendorData;
        }
        catch (error) {
            console.error(error.message);
            throw new Error(`Error sending vendor request: ${error.message}`);
        }
    });
}
