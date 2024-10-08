import { Router } from "express";
import { findProductByIdHandler } from "./product.controller";
import { getAllProductHandler } from "./product.controller";
import { createProductHandler } from "./product.controller";
import { updateProductHandler } from "./product.controller";
import { deleteProductByIdHandler } from "./product.controller";

const productRoutes = Router();
productRoutes.get("/find-product/:id", findProductByIdHandler);
productRoutes.get("/get-all-products", getAllProductHandler);
productRoutes.post("/create-product", createProductHandler);
productRoutes.patch("/update-product/:id", updateProductHandler);
productRoutes.delete("/delete-product/:id", deleteProductByIdHandler);
export { productRoutes };
