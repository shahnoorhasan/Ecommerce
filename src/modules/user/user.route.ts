import { Router } from "express";
import { findUserByIdHandler } from "./user.controller";
import { getAllUserByIdHandler } from "./user.controller";
import { createUserHandler } from "./user.controller";
import { updateUserHandler } from "./user.controller";
import { deleteUserHandler } from "./user.controller";

const UserRoutes = Router();
UserRoutes.get("/find-user/:id", findUserByIdHandler);
UserRoutes.get("/get-users", getAllUserByIdHandler);
UserRoutes.post("/create-user", createUserHandler);
UserRoutes.patch("/update-user/:id", updateUserHandler);
UserRoutes.delete("/delete-user/:id", deleteUserHandler);
export { UserRoutes as userRoute };
