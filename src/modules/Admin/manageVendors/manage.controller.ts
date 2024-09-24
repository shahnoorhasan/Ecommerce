import { Request, Response } from "express";
import {
  deactivatedVendorProducts,
  deleteVendorCategoryRequests,
  getAllVendorData,
  getTotalVendorsCount,
  revertVendor,
} from "./manage.service";
import { getVendorsByCategoryName } from "./manage.service";
import { CategoryNameSchema, VendorIdSchema } from "./manage.schema";
import { ZodError } from "zod";

export async function getTotalVendorsCountHandler(req: Request, res: Response) {
  try {
    const vendorCount = await getTotalVendorsCount();
    res.status(200).json({
      status: 200,
      message: "Successfully Returned vendor count",
      data: vendorCount,
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

export async function getAllVendorDataHandler(req: Request, res: Response) {
  try {
    const vendorsData = await getAllVendorData();
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved all vendors",
      data: vendorsData,
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

export async function getVendorsByCategoryNameHandler(
  req: Request,
  res: Response
) {
  try {
    const { name } = CategoryNameSchema.parse(req.body);
    const vendors = await getVendorsByCategoryName(name);

    if (vendors.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "Category does not exist",
        data: null,
        success: false,
      });
    }
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved vendors by category name",
      data: vendors,
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
  }
}

export async function revertVendorHandler(req: Request, res: Response) {
  try {
    const { id } = VendorIdSchema.parse(req.body);
    const vendor = await revertVendor(id);
    res.status(200).json({
      status: 200,
      message: "Successfully Changed vendor Role",
      data: vendor,
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

export async function deactivateVendorProductsHandler(
  req: Request,
  res: Response
) {
  try {
    const { id } = VendorIdSchema.parse(req.body);
    const vendor = await deactivatedVendorProducts(id);
    res.status(200).json({
      status: 200,
      message: "Successfully deactivated Products",
      data: vendor,
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

export async function deleteVendorCategoryRequestsHandler(
  req: Request,
  res: Response
) {
  try {
    const { id } = VendorIdSchema.parse(req.body);
    const vendor = await deleteVendorCategoryRequests(id);
    res.status(200).json({
      status: 200,
      message: "Successfully deleted Vendor Category Requests",
      data: vendor,
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
