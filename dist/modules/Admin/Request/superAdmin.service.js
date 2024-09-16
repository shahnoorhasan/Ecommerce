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
exports.getPendingVendorRequests = getPendingVendorRequests;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function getPendingVendorRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield db_util_1.default.vendorRequest.findMany({
                where: { status: "pending" },
                include: {
                    user: {
                        select: { id: true, email: true, fullName: true, role: true },
                    },
                },
            });
            return requests;
        }
        catch (error) {
            console.error("Error fetching vendor requests:", error.message);
            throw new Error("Could not fetch vendor requests");
        }
    });
}
