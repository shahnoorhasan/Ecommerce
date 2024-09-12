import { Router } from "express";
import { AnyUserSignUpHandler } from "./auth.controller";
import { AnyUserSignInHandler } from "./auth.controller";

const AuthRoutes = Router();
AuthRoutes.post("/User-sign-up", AnyUserSignUpHandler);
AuthRoutes.post("User-sign-in", AnyUserSignInHandler);

export { AuthRoutes as authRoute };
