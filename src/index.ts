import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENV } from "./utils/env.util";

import { userRoute } from "./modules/user/user.route";
import { PurchasingRoute } from "./modules/purchasing/purchasing.route";
import { authRoute } from "./modules/auth/auth.route";
import { VendorRequests } from "./modules/vendor/request/request.route";
import { AdminRequestRoutes } from "./modules/Admin/Request/Request.route";
import { VendorProductRoutes } from "./modules/vendor/product/product.route";
import { protection } from "./middlewares/protection.middleware";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", VendorProductRoutes);
app.use("/", userRoute);
app.use("/", PurchasingRoute);
app.use("/", authRoute);
app.use("/", VendorRequests);
app.use("/", AdminRequestRoutes);

app.listen(ENV.PORT, () => {
  console.log(`Application running at http://localhost:${ENV.PORT}`);
});
