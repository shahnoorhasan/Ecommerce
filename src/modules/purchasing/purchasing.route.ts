import { Router } from "express";

import { createPurchasingHandler } from "./purchasing.controller";
import { protection } from "../../middlewares/protection.middleware";

const purchasingRoutes = Router();

purchasingRoutes.post("/purchasing/:id", protection, createPurchasingHandler);
export { purchasingRoutes as PurchasingRoute };
