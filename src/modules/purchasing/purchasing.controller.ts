import { Request, Response } from "express";
import { getUserById } from "../user/user.service";
// import { getProductByName } from "./purchasing.service";
import { createPurchasing } from "./purchasing.service";
import { date, nullable, ZodError } from "zod";
import prisma from "../../utils/db.util";
import { json } from "body-parser";
import { parse } from "path";
import { createPurchasingSchema } from "./purchasing.schema";

// export async function getProductByNameHandler(req: Request, res: Response) {
//   try {
//     const { productName } = createPurchasingSchema.parse(req.body);
//     if (!productName || typeof productName !== "string")
//       throw new Error(`Invalid name or failed in catching name through body`);
//     const productinfo = await getProductByName(productName);
//     res.status(200).json({
//       status: 200,
//       message: "success",
//       data: productinfo,
//       success: true,
//     });
//   } catch (error: any) {
//     console.log(error.message);
//     res.status(400).json({
//       status: 400,
//       message: error.message,
//       data: null,
//       success: false,
//     });
//   }
// }

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
    const purchasinginfo = await createPurchasing(productName, userId);
    res.status(200).json({
      status: 200,
      message: "success",
      data: purchasinginfo,
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
