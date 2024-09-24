import { Request, Response } from "express";
import {
  approveCategoryRequests,
  getPendingVendorCategoryRequests,
  getPendingVendorRequests,
} from "./Request.service";
import { approveVendorRequest } from "./Request.service";
import { ZodError } from "zod";

export async function getVendorRequestsHandler(req: Request, res: Response) {
  try {
    const requests = await getPendingVendorRequests();
    res.status(200).json({
      status: 200,
      message: "Pending vendor requests retrieved",
      data: requests,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching vendor requests:", error.message);
    res.status(500).json({
      status: 500,
      message: "Could not retrieve vendor requests",
      success: false,
    });
  }
}
export async function approveVendorRequestHandler(req: Request, res: Response) {
  try {
    const { requestId, action } = req.body;

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid action. Must be either 'accept' or 'reject'.",
        data: null,
        success: false,
      });
    }

    const result = await approveVendorRequest(requestId, action);

    res.status(200).json({
      status: 200,
      message: result.message,
      data: result.message,
      success: true,
    });
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
export async function getVendorCategoryRequestsHandler(
  req: Request,
  res: Response
) {
  try {
    const requests = await getPendingVendorCategoryRequests();
    res.status(200).json({
      status: 200,
      message: "Pending vendor category requests retrieved",
      data: requests,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching vendor category requests:", error.message);
    res.status(500).json({
      status: 500,
      message: "Could not retrieve vendor category requests",
      success: false,
    });
  }
}

export async function approveCategoryRequestHandler(
  req: Request,
  res: Response
) {
  try {
    const { requestId, action } = req.body;

    if (!requestId || !["accept", "reject"].includes(action)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid requestId or action",
        data: null,
        success: false,
      });
    }

    const result = await approveCategoryRequests(requestId, action);

    res.status(200).json({
      status: 200,
      message: "Action Performed",
      data: result.message,
      success: true,
    });
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
