"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchasingSchema = void 0;
const zod_1 = require("zod");
exports.createPurchasingSchema = zod_1.z.object({
    productName: zod_1.z.string(),
});
