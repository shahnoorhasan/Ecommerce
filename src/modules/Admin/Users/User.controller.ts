import { Request, Response } from "express";
import { allUsersPurchasingData, totalUsersCount } from "./User.service";

export async function totalUsersCountHandler(req: Request, res: Response) {
  try {
    const users = await totalUsersCount();
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved user count",
      data: users,
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

export async function allUsersPurchasingDataHandler(
  req: Request,
  res: Response
) {
  try {
    const result = await allUsersPurchasingData();
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved Purchasing Data",
      data: result,
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
