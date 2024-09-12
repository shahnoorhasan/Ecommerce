import { Router } from "express";
import { findAnyUserByIdHandler } from "./user.controller";
import { getAllUserByIdHandler } from "./user.controller";
// import { createAnyUserHandler } from "./user.controller";
import { updateAnyUserHandler } from "./user.controller";
import { deleteAnyUserHandler } from "./user.controller";
// import { AnyUserSignInHandler } from "./user.controller";

const UserRoutes = Router();
UserRoutes.get("/find-user/:id", findAnyUserByIdHandler);
UserRoutes.get("/get-users", getAllUserByIdHandler);
// UserRoutes.post("/create-user", createAnyUserHandler);
// UserRoutes.post("/Sign-In-User", AnyUserSignInHandler);
UserRoutes.patch("/update-user/:id", updateAnyUserHandler);
UserRoutes.delete("/delete-user/:id", deleteAnyUserHandler);
export { UserRoutes as userRoute };
