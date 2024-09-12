import { Prisma } from "@prisma/client";
import prisma from "../../utils/db.util";
import { getAnyUserById } from "../user/user.service";
import { createPurchasingSchema } from "./purchasing.schema";
import { any, object } from "zod";

// export async function getProductByName(name: string) {
//   const purchasing = await prisma.product.findUnique({
//     where: { name },
//     select: {
//       id: true,
//       isActive: true,
//       name: true,
//       price: true,
//       categoryId: true,
//     },
//   });
//   if (!purchasing) throw new Error(`Product name invalid`);
//   if (!purchasing.isActive) throw new Error(`Product is not up for sale`);
//   return purchasing;
// }

export async function createPurchasing(name: string, userId: number) {
  const product = await prisma.product.findUnique({
    where: { name },
    select: {
      id: true,
      isActive: true,
      name: true,
      price: true,
      categoryId: true,
    },
  });
  if (!product) throw new Error(`Product name invalid`);
  if (!product.isActive) throw new Error(`Product is not up for sale`);
  const userinfo = await getAnyUserById(userId);
  if (!userinfo) throw new Error(`Id not obtained from Route`);
  await prisma.product.update({
    data: { isActive: false },
    where: { name },
  });
  const purchasing = await prisma.purchasing.create({
    data: {
      productId: product.id,
      userId: userinfo.id,
    },
  });
  return [product, userinfo];
}
