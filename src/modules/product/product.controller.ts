import { Request, Response } from "express";
import { getProductById } from "./product.service";
import { getAllProduct } from "./product.service";
import { createProduct } from "./product.service";
import { updateProduct } from "./product.service";
import { deleteProductById } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.schema";
import { date, nullable, ZodError } from "zod";
import prisma from "../../utils/db.util";

export async function findProductByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");

    const product = await getProductById(id);
    res
      .status(200)
      .json({
        status: 200,
        message: "Found Successfully",
        data: product,
        success: true,
      });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(400)
      .json({
        status: 400,
        message: error.message,
        data: null,
        success: false,
      });
  }
}

export async function getAllProductHandler(req: Request, res: Response) {
  try {
    /*const id = Number(req.params.id);
        if (Number.isNaN(id)) throw new Error('Id must be a number');*/

    const product = await getAllProduct();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: product, success: false });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(400)
      .json({
        status: 400,
        message: error.message,
        data: null,
        success: false,
      });
  }
}

export async function createProductHandler(req: Request, res: Response) {
  try {
    /*const id = Number(req.params.id);
        if (Number.isNaN(id)) throw new Error('Id must be a number');*/
    const data = createProductSchema.parse(req.body);
    const product = await createProduct(data);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: product, success: true });
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

export async function updateProductHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");
    const data = updateProductSchema.parse(req.body);
    const product = await updateProduct(data, id);
    res.status(200).json({
      status: 200,
      message: `Successfully Updated`,
      data: product,
      success: true,
    });
  } catch (error: any) {
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

export async function deleteProductByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");

    await deleteProductById(id);
    res
      .status(200)
      .json({
        status: 200,
        message: "Successfully deleted",
        data: id,
        success: true,
      });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(400)
      .json({
        status: 400,
        message: error.message,
        data: null,
        success: false,
      });
  }
}
