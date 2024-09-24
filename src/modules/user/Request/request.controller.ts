import { Request, Response } from "express";
import { sendVendorRequest } from "./request.service";
import { ZodError } from "zod";
import { sendVendorRequestSchema } from "./request.schema";

export async function sendVendorRequestHandler(req: Request, res: Response) {
  try {
    const { email } = sendVendorRequestSchema.parse(req.body);

    const vendorData = await sendVendorRequest(email);

    if (vendorData) {
      res.status(200).json({
        status: 200,
        message: "Vendor request sent successfully",
        data: vendorData,
        success: true,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Unable to send vendor request",
        data: null,
        success: false,
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      const messageJSON = JSON.parse(error.message);
      const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
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
