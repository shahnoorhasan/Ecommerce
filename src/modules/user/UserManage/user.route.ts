import { Router } from "express";
import { findAnyUserByIdHandler } from "./user.controller";
import { getAllUserByIdHandler } from "./user.controller";
import { updateAnyUserHandler } from "./user.controller";
import { deleteAnyUserHandler } from "./user.controller";
import { protection } from "../../../middlewares/protection.middleware";

const UserRoutes = Router();

UserRoutes.get("/find-user/:id", protection, findAnyUserByIdHandler);
UserRoutes.get("/get-users", protection, getAllUserByIdHandler);
UserRoutes.patch("/update-user/:id", protection, updateAnyUserHandler);
UserRoutes.delete("/delete-user/:id", protection, deleteAnyUserHandler);

export { UserRoutes as userRoute };
