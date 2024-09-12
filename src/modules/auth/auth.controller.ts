import { Request, Response } from "express";
import { AnyUserSignUp } from "./auth.service";
import { AnyUserSignIn } from "./auth.service";
import { AnyUserSignInSchema, AnyUserSignUpSchema } from "./auth.schema";
import { date, nullable, ZodError } from "zod";

export async function AnyUserSignUpHandler(req: Request, res: Response) {
  try {
    const data = AnyUserSignUpSchema.parse(req.body);
    const user = await AnyUserSignUp(data);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: user,
      success: true,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `Key name must be written correctly, ${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
      console.error(message);
      return res
        .status(400)
        .json({ status: 400, message: message, data: null, success: false });
    }

    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
}

export async function AnyUserSignInHandler(req: Request, res: Response) {
  try {
    const { email, password } = AnyUserSignInSchema.parse(req.body);
    if (!email || !password) {
      return res.status(400).json({
        Status: 400,
        message: "Email and Password are required",
        data: null,
        success: false,
      });
    }
    const result = await AnyUserSignIn(email, password);
    res
      .status(200)
      .json({ status: 200, message: "success", data: result, Success: true });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
      success: false,
    });
  }
}
