import { Request, Response } from "express";
import { getAnyUserById } from "./user.service";
import { getAllUserById } from "./user.service";

import { updateAnyUser } from "./user.service";
import { deleteAnyUser } from "./user.service";

import {
  createUserSchema,
  updateUserSchema,
  UserSignInSchema,
} from "./user.schema";
import { date, nullable, ZodError } from "zod";
import prisma from "../../utils/db.util";
import { json } from "body-parser";
import { error } from "console";

export async function findAnyUserByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(`User Id does not exist`);
    const user = await getAnyUserById(id);
    res.status(200).json({
      status: 200,
      message: "Found Success",
      data: user,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

export async function getAllUserByIdHandler(req: Request, res: Response) {
  try {
    const user = await getAllUserById();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: null, success: true });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

// export async function createAnyUserHandler(req: Request, res: Response) {
//   try {
//     const data = createUserSchema.parse(req.body);
//     const { user, token } = await createAnyUser(data);
//     res.status(200).json({
//       status: 200,
//       message: "Success",
//       data: { user, token },
//       success: true,
//     });
//   } catch (error: any) {
//     if (error instanceof ZodError) {
//       const messageJSON = JSON.parse(error.message);
//       const message = `Key name must be written correctly, ${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
//       console.error(message);
//       return res
//         .status(400)
//         .json({ status: 400, message: message, data: null, success: false });
//     }

//     console.error(error.message);
//     res.status(400).json({ message: error.message });
//   }
// }

// export async function AnyUserSignInHandler(req: Request, res: Response) {
//   try {
//     const { email, password } = UserSignInSchema.parse(req.body);
//     if (!email || !password) {
//       return res.status(400).json({
//         Status: 400,
//         message: "Email and Password are required",
//         data: null,
//         success: false,
//       });
//     }
//     const result = await AnyUserSignIn(email, password);
//     res
//       .status(200)
//       .json({ status: 200, message: "success", data: result, Success: true });
//   } catch (error: any) {
//     console.error(error.message);
//     res.status(400).json({
//       status: 400,
//       message: error.message,
//       data: null,
//       success: false,
//     });
//   }
// }

export async function updateAnyUserHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(` User Id must be a number`);
    const data = updateUserSchema.parse(req.body);
    const user = await updateAnyUser(data, id);
    res.status(200).json({
      status: 200,
      message: "Successfully Updated",
      data: user,
      success: "true",
    });
  } catch (error: any) {
    if (error instanceof ZodError)
      if (error instanceof ZodError) {
        const messageJSON = JSON.parse(error.message);
        const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
        console.error(message);
        return res
          .status(400)
          .json({ status: 400, message: message, data: null, success: false });
      }
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
}

export async function deleteAnyUserHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(`User Id does not exist`);
    await deleteAnyUser(id);
    res.status(200).json({
      status: 200,
      message: "Successfully Deleted",
      data: id,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      status: 200,
      message: error.message,
      data: null,
      success: false,
    });
  }
}
