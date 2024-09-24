import { Prisma } from "@prisma/client";
import prisma from "../../../utils/db.util";

export async function totalUsersCount() {
  try {
    const users = await prisma.user.count({ where: { role: "Customer" } });
    if (!users) throw new Error(`Error fetching Users`);
    return users;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }
}

export async function allUsersPurchasingData() {
  try {
    const result = await prisma.purchasing.findMany({
      select: {
        id: true,
        status: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            country: true,
            city: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            category: { select: { name: true } },
          },
        },
      },
    });
    return result;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }
}
