import { Prisma } from "@prisma/client";
import prisma from "../../utils/db.util";
import { createProductSchema } from "./product.schema";
import { any } from "zod";

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error(`Product at ID:${id} not exist in category`);
  return product;
}

export async function getAllProduct() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  return products;
}

export async function createProduct(data: Prisma.ProductUncheckedCreateInput) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        categoryId: data.categoryId,
      },
    });
    return product;
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta.target[0];
      throw new Error(
        `Same ${target} Product is already exist, Must be Unique`
      );
    }
    throw error;
  }
}
export async function updateProduct(
  data: Prisma.ProductUncheckedUpdateInput,
  id: number
) {
  const existingProduct = await getProductById(id);
  if (!existingProduct) throw new Error("Product not found");

  await prisma.product.update({
    data: {
      name: data.name || existingProduct.name,
      price: data.price || existingProduct.price,
    },
    where: { id },
  });
}

export async function deleteProductById(id: number) {
  const existingProduct = await getProductById(id);
  if (!existingProduct) throw new Error(`Product not found`);

  await prisma.product.delete({ where: { id } });
}
