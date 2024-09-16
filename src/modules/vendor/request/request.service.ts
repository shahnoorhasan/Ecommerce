import { Prisma } from "@prisma/client";
import prisma from "../../../utils/db.util";
import { error } from "console";
import { getAnyUserById } from "../../user/user.service";

export async function sendVendorRequest(email: string) {
  try {
    const vendor = await prisma.user.findUnique({
      where: { email },
      select: { id: true, fullName: true, role: true, email: true },
    });
    if (!vendor) throw new Error("Email does not belong to any user");
    if (vendor.role == "SuperAdmin")
      throw new Error("Admin cannot be registered as user");
    if (vendor.role == "Vendor") throw new Error(`You are already a vendor`);

    const vendorData = await prisma.vendorRequest.create({
      data: {
        userId: vendor.id,
      },
    });
    return vendorData;
  } catch (error: any) {
    console.log(error);
  }
}
export async function CategoryRequestVendor(
  vendorId: number,
  data: { name: string }
) {
  try {
    const vendor = await getAnyUserById(vendorId);

    const categoryInfo = await prisma.vendorCategoryRequests.create({
      data: {
        name: data.name,
        userId: vendor.id,
      },
    });

    return categoryInfo;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
