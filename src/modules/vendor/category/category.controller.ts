import { Request, Response } from "express";
import { getCategoryByNameWithProducts } from "./category.service";
import { getAllCategory } from "./category.service";
import { createCategorySchema } from "./category.schema";
import { ZodError } from "zod";

export async function getAllCategoryHandler(req: Request, res: Response) {
  try {
    const category = await getAllCategory();
    res
      .status(200)
      .json({ status: 200, message: "Success", data: category, success: true });
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

export async function categoryWithProductHandler(req: Request, res: Response) {
  try {
    const { name } = createCategorySchema.parse(req.body);

    const categoryProduct = await getCategoryByNameWithProducts(name);
    res.status(200).json({
      status: 200,
      message: "success",
      data: categoryProduct,
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
