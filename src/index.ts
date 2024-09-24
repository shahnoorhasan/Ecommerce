import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENV } from "./utils/env.util";
import { userRoute } from "./modules/user/UserManage/user.route";
import { PurchasingRoute } from "./modules/purchasing/purchasing.route";
import { authRoute } from "./modules/auth/auth.route";
import { AdminRequestRoutes } from "./modules/Admin/Request/Request.route";
import { VendorProductRoutes } from "./modules/vendor/product/product.route";
import { AdminManageRoute } from "./modules/Admin/manageVendors/manage.route";
import { AdminUserRoute } from "./modules/Admin/Users/User.route";
import { AdminCategoryRoute } from "./modules/Admin/category/category.route";
import { UserProductRoutes } from "./modules/user/Products/product.route";
import { VendorCategoryRoute } from "./modules/vendor/category/category.route";
import { VendorRequestRoute } from "./modules/vendor/request/request.route";
import { userToVendorRequestRoute } from "./modules/user/Request/request.route";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", authRoute);
app.use("/", AdminCategoryRoute);
app.use("/", AdminRequestRoutes);
app.use("/", AdminManageRoute);
app.use("/", AdminUserRoute);

app.use("/", PurchasingRoute);

app.use("/", userToVendorRequestRoute);
app.use("/", UserProductRoutes);
app.use("/", userRoute);

app.use("/", VendorCategoryRoute);
app.use("/", VendorProductRoutes);
app.use("/", VendorRequestRoute);

app.listen(ENV.PORT, () => {
  console.log(`Application running at http://localhost:${ENV.PORT}`);
});
