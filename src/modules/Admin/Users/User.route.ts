import { Router } from "express";
import {
  allUsersPurchasingDataHandler,
  totalUsersCountHandler,
} from "./User.controller";

const adminUserRoutes = Router();

adminUserRoutes.get("/Total-users", totalUsersCountHandler);
adminUserRoutes.get("/Purchasing-Info", allUsersPurchasingDataHandler);

export { adminUserRoutes as AdminUserRoute };
