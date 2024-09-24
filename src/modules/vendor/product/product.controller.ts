import { Request, Response } from "express";
import {
  countVendorMyProducts,
  countVendorPurchases,
  deleteProductByName,
  getProductById,
  getVendorProducts,
  OutOfStockProducts,
  vendorProductsPurchased,
  vendorTotalEarnings,
} from "./product.service";
import { getAllProduct } from "./product.service";
import { createProduct } from "./product.service";
import { updateProduct } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.schema";
import { ZodError } from "zod";

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

export async function getVendorProductsHandler(req: Request, res: Response) {
  try {
    const vendorId = parseInt(req.params.vendorId);
    const products = await getVendorProducts(vendorId);
    res.status(200).json({
      status: 200,
      message: "successful",
      data: products,
      success: true,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `${messageJSON[0].message}`;
      console.log(message);
      return res.status(400).json({
        status: 400,
        message: message,
        data: null,
        success: false,
      });
    }

    console.error(error.message);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
      success: false,
    });
  }
}

export async function createProductHandler(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new Error("vendorID must be a number");

    const { categoryName, name, price, quantity, description } = req.body;

    createProductSchema.parse({ name, price, quantity, description });
    const product = await createProduct(id, categoryName, {
      name,
      price,
      quantity,
      description,
    });
    res
      .status(200)
      .json({ status: 200, message: "Success", data: product, success: true });
    console.log("Request Body:", req.body);
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `${messageJSON[0].message}`;
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

    const { categoryName, name, price, quantity, description, isActive } =
      req.body;
    const parsedData = updateProductSchema.parse({
      name,
      price,
      quantity,
      description,
      isActive,
    });

    const product = await updateProduct(categoryName, parsedData, id);

    res.status(200).json({
      status: 200,
      message: `Successfully Updated`,
      data: product,
      success: true,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `${messageJSON[0].message}`;
      console.error(message);
      return res
        .status(400)
        .json({ status: 400, message: message, data: null, success: false });
    }
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
}

export async function deleteProductByNameHandler(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      throw new Error("Invalid name provided");
    }
    await deleteProductByName(name);
    res.status(200).json({
      status: 200,
      message: "Successfully deleted",
      data: name,
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

export async function vendorProductsPurchasedHandler(
  req: Request,
  res: Response
) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const purchasedProducts = await vendorProductsPurchased(vendorId);

    res.status(200).json({
      status: 200,
      message: "Successfully retrieved purchased products",
      data: purchasedProducts,
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

export async function countVendorPurchasesHandler(req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const purchaseCount = await countVendorPurchases(vendorId);

    res.status(200).json({
      status: 200,
      message: `Successfully retrieved purchase count for vendor ${vendorId}`,
      data: { purchaseCount },
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

export async function OutOfStockProductsHandler(req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const OutOfStockCount = await OutOfStockProducts(vendorId);

    res.status(200).json({
      status: 200,
      message: `Successfully retrieved  out of stock products for vendor ${vendorId}`,
      data: { OutOfStockCount },
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

export async function countVendorMyProductsHandler(
  req: Request,
  res: Response
) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const ProductCount = await countVendorMyProducts(vendorId);

    res.status(200).json({
      status: 200,
      message: `Successfully retrieved Product count for vendor ${vendorId}`,
      data: { ProductCount },
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

export async function vendorTotalEarningsHandler(req: Request, res: Response) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const purchasedProducts = await vendorTotalEarnings(vendorId);

    res.status(200).json({
      status: 200,
      message: `Successfully retrieved Total earnings for vendor ${vendorId}`,
      data: { purchasedProducts },
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
