import prisma from "../../utils/db.util";
import { getAnyUserById } from "../user/UserManage/user.service";

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
  if (product.isActive === false) throw new Error(`Product is not up for sale`);

  const userinfo = await getAnyUserById(userId);
  if (!userinfo) throw new Error(`User does not exist`);

  await prisma.product.update({
    data: {
      quantity: {
        decrement: 1,
      },
    },
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
