import { Request, Response } from "express";
import { CategoryRequestVendor } from "./request.service";
import { ZodError } from "zod";
import { vendorCategoryRequestSchema } from "./request.schema";

export async function vendorCategoryRequestHandler(
  req: Request,
  res: Response
) {
  try {
    const vendorId = Number(req.params.vendorId);
    if (Number.isNaN(vendorId)) throw new Error("vendorID must be a number");

    const { name } = req.body;
    vendorCategoryRequestSchema.parse({ name });

    const vendorData = await CategoryRequestVendor(vendorId, {
      name,
    });

    // Check if the vendor data is returned successfully
    if (vendorData?.id && vendorData.name) {
      res.status(200).json({
        status: 200,
        message: "Vendor Category request sent successfully",
        data: vendorData,
        success: true,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Unable to send vendor category request",
        data: null,
        success: false,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((e) => `${e.path[0]}: ${e.message}`)
        .join(", ");
      console.log(message);
      return res.status(400).json({
        status: 400,
        message: message, // Detailed message from Zod
        data: null,
        success: false,
      });
    }

    // Handle other errors
    console.error(error.message);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: null,
      success: false,
    });
  }
}
