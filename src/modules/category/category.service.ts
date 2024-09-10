import { Prisma } from "@prisma/client";
import { createCategorySchema } from "./category.schema";
import { any, object } from "zod";
import prisma from "../../utils/db.util";

export async function getCategoryById(id: number) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new Error(`Category at ${id} not exist`);
  return category;
}

export async function getAllCategory() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function createCategory(
  data: Prisma.CategoryUncheckedCreateInput
) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return;
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta.target[0];
      throw new Error(`${target} Must be unique`);
    }
    throw error;
  }
}
export async function updateCategory(
  data: Prisma.CategoryUncheckedUpdateInput,
  id: number
) {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) throw new Error(`Category not found`);
  await prisma.category.update({ data: { name: data.name }, where: { id } });
}

export async function deleteCategoryById(id: number) {
  const existingCategory = await getCategoryById(id);
  if (!existingCategory) throw new Error(`Category not found`);
  await prisma.category.delete({ where: { id } });
}

export async function getCategoryByIdWithProducts(id: number) {
  const categorysWithProducts = await prisma.category.findUnique({
    where: { id },
    include: { Product: true },
  });
  if (!categorysWithProducts) throw new Error(`Category not found`);
  return categorysWithProducts;
}
