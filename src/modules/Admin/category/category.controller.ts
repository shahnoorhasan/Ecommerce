import { Request, Response } from "express";
import {
  getCategoryById,
  getCategoryByIdWithProducts,
} from "./category.service";
import { getAllCategory } from "./category.service";
import { createCategory } from "./category.service";
import { updateCategory } from "./category.service";
import { deleteCategoryById } from "./category.service";
import { createCategorySchema, updateCategorySchema } from "./category.schema";
import { ZodError } from "zod";

export async function findCategoryByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");

    const category = await getCategoryById(id);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: category, success: true });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({
      status: 200,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

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

export async function createCategoryHandler(req: Request, res: Response) {
  try {
    const data = createCategorySchema.parse(req.body);
    const category = await createCategory(data);
    res.json({
      status: 200,
      message: "Success",
      data: category,
      success: true,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
      console.error(message);
      return res.json({
        status: 400,
        message: message,
        data: null,
        success: false,
      });
    }

    console.error(error.message);
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

export async function updateCategoryHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");
    const data = updateCategorySchema.parse(req.body);
    const category = await updateCategory(data, id);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: category, success: true });
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

export async function deleteCategoryByIdHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");

    await deleteCategoryById(id);
    res.status(200).json({
      status: 200,
      message: "Successfully deleted",
      data: id,
      success: true,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(400).json({
      status: 200,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

export async function categoryWithProductHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("Id must be a number");
    const categoryProduct = await getCategoryByIdWithProducts(id);
    res.status(200).json({
      status: 200,
      message: "success",
      data: categoryProduct,
      success: true,
    });
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
