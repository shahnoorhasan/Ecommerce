import { Router } from "express";
import {
  approveCategoryRequestHandler,
  getVendorCategoryRequestsHandler,
  getVendorRequestsHandler,
} from "./Request.controller";
import { approveVendorRequestHandler } from "./Request.controller";

const adminRequestRoute = Router();

adminRequestRoute.get("/get-vendor-request", getVendorRequestsHandler);
adminRequestRoute.post("/approve-vendor-req", approveVendorRequestHandler);
adminRequestRoute.get(
  "/get-category-request",
  getVendorCategoryRequestsHandler
);
adminRequestRoute.post("/approve-category-req", approveCategoryRequestHandler);

export { adminRequestRoute as AdminRequestRoutes };
