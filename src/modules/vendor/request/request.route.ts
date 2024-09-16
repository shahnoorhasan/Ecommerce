import { Router } from "express";
import {
  sendVendorRequestHandler,
  vendorCategoryRequestHandler,
} from "./request.controller";
import { protection } from "../../../middlewares/protection.middleware";

const vendorRequest = Router();
vendorRequest.post(
  "/send-vendor-request",
  protection,
  sendVendorRequestHandler
);
vendorRequest.post(
  "/category-vendor-request/:vendorId",
  protection,
  vendorCategoryRequestHandler
);

export { vendorRequest as VendorRequests };
