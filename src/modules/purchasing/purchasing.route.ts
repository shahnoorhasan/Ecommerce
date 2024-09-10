import { Router } from "express";

import { createPurchasingHandler } from "./purchasing.controller";

const purchasingRoutes = Router();

purchasingRoutes.post("/purchasing/:id", createPurchasingHandler);
export { purchasingRoutes as PurchasingRoute };
