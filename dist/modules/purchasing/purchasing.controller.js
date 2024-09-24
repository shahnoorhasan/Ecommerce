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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchasingHandler = createPurchasingHandler;
const purchasing_service_1 = require("./purchasing.service");
const purchasing_schema_1 = require("./purchasing.schema");
function createPurchasingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productName = req.query.productName;
            if (!productName || typeof productName !== "string")
                throw new Error(`Invalid name or failed in catching name through query`);
            const userId = Number(req.params.id);
            if (Number.isNaN(userId))
                throw new Error(`User Id does not exist`);
            if (!productName || typeof productName !== "string")
                throw new Error(`Invalid name or failed in catching name through body`);
            purchasing_schema_1.createPurchasingSchema.parse({ productName });
            const purchasingInfo = yield (0, purchasing_service_1.createPurchasing)(productName, userId);
            res.status(200).json({
                status: 200,
                message: "success",
                data: purchasingInfo,
                success: true,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
