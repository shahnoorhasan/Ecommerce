import prisma from "../../../utils/db.util";

export async function getCategoryByName(name: string) {
  const category = await prisma.category.findUnique({ where: { name } });
  if (!category) throw new Error(`Category with ${name} does not exist`);
  return category;
}

export async function getAllCategory() {
  const categories = await prisma.category.findMany({ select: { name: true } });
  return categories;
}

export async function getCategoryByNameWithProducts(name: string) {
  const categoryWithProducts = await prisma.category.findUnique({
    where: { name },
    include: { Product: true },
  });
  if (!categoryWithProducts) throw new Error(`Category not found`);
  return categoryWithProducts;
}
