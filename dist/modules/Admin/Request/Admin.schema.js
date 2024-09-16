"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorRequestApprovalSchema = void 0;
const zod_1 = require("zod");
exports.vendorRequestApprovalSchema = zod_1.z.object({
    status: zod_1.z.string().toLowerCase(),
});
