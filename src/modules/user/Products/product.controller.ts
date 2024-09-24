import { Request, Response } from "express";
import { getAllProduct, getProductByName } from "./product.service";
import { productNameSchema } from "./product.schema";
import { ZodError } from "zod";

export async function findProductByNameHandler(req: Request, res: Response) {
  try {
    const { name } = productNameSchema.parse(req.body);
    const product = await getProductByName(name);
    res.status(200).json({
      status: 200,
      message: "Found Successfully",
      data: product,
      success: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = ` ${messageJSON[0].message}`;
      console.error(message);
      return res
        .status(400)
        .json({ status: 400, message: message, data: null, success: false });
    }
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: `${error}`,
      data: null,
      success: false,
    });
  }
}

export async function getAllProductHandler(req: Request, res: Response) {
  try {
    const product = await getAllProduct();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: product, success: false });
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
