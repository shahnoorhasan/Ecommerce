import { Request, Response } from "express";

import { createPurchasing } from "./purchasing.service";

import { createPurchasingSchema } from "./purchasing.schema";

export async function createPurchasingHandler(req: Request, res: Response) {
  try {
    const productName = req.query.productName as string;
    if (!productName || typeof productName !== "string")
      throw new Error(`Invalid name or failed in catching name through query`);
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) throw new Error(`User Id does not exist`);
    if (!productName || typeof productName !== "string")
      throw new Error(`Invalid name or failed in catching name through body`);
    createPurchasingSchema.parse({ productName });
    const purchasingInfo = await createPurchasing(productName, userId);
    res.status(200).json({
      status: 200,
      message: "success",
      data: purchasingInfo,
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
