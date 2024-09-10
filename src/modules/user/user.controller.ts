import { Request, Response } from "express";
import { getUserById } from "./user.service";
import { getAllUserById } from "./user.service";
import { createUser } from "./user.service";
import { updateUser } from "./user.service";
import { deleteUser } from "./user.service";
import { createUserSchema, updateUserSchema } from "./user.schema";
import { date, nullable, ZodError } from "zod";
import prisma from "../../utils/db.util";
import { json } from "body-parser";

export async function findUserByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(`User Id does not exist`);
    const user = await getUserById(id);
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

export async function createUserHandler(req: Request, res: Response) {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await createUser(data);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: user, success: true });
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

export async function updateUserHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(` User Id must be a number`);
    const data = updateUserSchema.parse(req.body);
    const user = await updateUser(data, id);
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

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error(`User Id does not exist`);
    await deleteUser(id);
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
