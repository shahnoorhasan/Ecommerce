import prisma from "../../../utils/db.util";
import { getAnyUserById } from "../../user/UserManage/user.service";

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
