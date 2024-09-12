import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ENV } from "./utils/env.util";
import { categoryRoute } from "./modules/category/category.route";
import { productRoutes } from "./modules/product/product.route";
import { userRoute } from "./modules/user/user.route";
import { PurchasingRoute } from "./modules/purchasing/purchasing.route";
import { authRoute } from "./modules/auth/auth.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/", categoryRoute);
app.use("/", productRoutes);
app.use("/", userRoute);
app.use("/", PurchasingRoute);
app.use("/", authRoute);

app.listen(ENV.PORT, () => {
  console.log(`Application running at http://localhost:${ENV.PORT}`);
});
