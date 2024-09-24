import { Router } from "express";
import { sendVendorRequestHandler } from "./request.controller";
import { protection } from "../../../middlewares/protection.middleware";

const UserToVendorRequestRoute = Router();
UserToVendorRequestRoute.post(
  "/send-vendor-request",
  protection,
  sendVendorRequestHandler
);

export { UserToVendorRequestRoute as userToVendorRequestRoute };
