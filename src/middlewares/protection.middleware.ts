import { Request, Response, NextFunction } from "express";
import { ENV } from "../utils/env.util";
import { JwtPayload, verify } from "jsonwebtoken";

export async function protection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) throw new Error(`Unauthorized Access`);
    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== "Bearer") throw new Error(`Unauthorized Access`);
    if (!token) throw new Error(`Unauthorized Access`);
    const payload = verify(token, ENV.JWT_SECRET as string);
    const userId = (payload as JwtPayload).user_id;
    (req as any)["userId"] = userId;
    next();
  } catch (error: any) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
      data: null,
      success: false,
    });
  }
}
