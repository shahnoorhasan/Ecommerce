import { Router } from "express";
import {
  findProductByNameHandler,
  getAllProductHandler,
} from "./product.controller";
import { protection } from "../../../middlewares/protection.middleware";

const userProductRoutes = Router();

userProductRoutes.post("/find-product", protection, findProductByNameHandler);
userProductRoutes.get("/get-all-products", protection, getAllProductHandler);

export { userProductRoutes as UserProductRoutes };
