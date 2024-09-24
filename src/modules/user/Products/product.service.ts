import prisma from "../../../utils/db.util";

export async function getProductByName(name: string) {
  const category = await prisma.product.findUnique({ where: { name } });
  if (!category) throw new Error(`Product with ${name} does not exist`);
  return category;
}

export async function getAllProduct() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    where: { isActive: true },
  });
  return products;
}
