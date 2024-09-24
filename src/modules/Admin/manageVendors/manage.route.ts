import { Router } from "express";
import {
  deactivateVendorProductsHandler,
  deleteVendorCategoryRequestsHandler,
  getAllVendorDataHandler,
  getTotalVendorsCountHandler,
  getVendorsByCategoryNameHandler,
  revertVendorHandler,
} from "./manage.controller";
import { getVendorCategoryRequestsHandler } from "../Request/Request.controller";

const adminManageRoutes = Router();

adminManageRoutes.get("/Total-Vendors", getTotalVendorsCountHandler);
adminManageRoutes.get("/Total-Vendors-Data", getAllVendorDataHandler);
adminManageRoutes.get("/Vendors-By-category", getVendorsByCategoryNameHandler);
adminManageRoutes.post("/Change-vendor-role", revertVendorHandler);
adminManageRoutes.post(
  "/delete-vendor-products",
  deactivateVendorProductsHandler
);
adminManageRoutes.delete(
  "/Delete-Category-Requests",
  deleteVendorCategoryRequestsHandler
);

export { adminManageRoutes as AdminManageRoute };
