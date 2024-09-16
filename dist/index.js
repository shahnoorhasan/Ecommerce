"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const env_util_1 = require("./utils/env.util");
const category_route_1 = require("./modules/category/category.route");
const user_route_1 = require("./modules/user/user.route");
const purchasing_route_1 = require("./modules/purchasing/purchasing.route");
const auth_route_1 = require("./modules/auth/auth.route");
const request_route_1 = require("./modules/vendor/request/request.route");
const Request_route_1 = require("./modules/Admin/Request/Request.route");
const product_route_1 = require("./modules/vendor/product/product.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/", category_route_1.categoryRoute);
app.use("/", product_route_1.VendorProductRoutes);
app.use("/", user_route_1.userRoute);
app.use("/", purchasing_route_1.PurchasingRoute);
app.use("/", auth_route_1.authRoute);
app.use("/", request_route_1.VendorRequests);
app.use("/", Request_route_1.AdminRequestRoutes);
app.listen(env_util_1.ENV.PORT, () => {
    console.log(`Application running at http://localhost:${env_util_1.ENV.PORT}`);
});
