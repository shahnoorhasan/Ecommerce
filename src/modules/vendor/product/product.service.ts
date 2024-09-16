import { Prisma } from "@prisma/client";
import prisma from "../../../utils/db.util";
import { getAnyUserById } from "../../user/user.service";
import { getCategoryByName } from "../category/category.service";

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new Error(`Product at ID:${id} not exist in category`);
  return product;
}

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

export async function getVendorProducts(vendorId: number) {
  const products = await prisma.product.findMany({
    where: { vendorId },
  });
  return products;
}

export async function createProduct(
  vendorId: number,
  categoryName: string,
  data: { name: string; price: number; quantity: number; description: string }
) {
  try {
    const vendorInfo = await getAnyUserById(vendorId);
    const category = await getCategoryByName(categoryName);
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        categoryId: category.id,
        vendorId: vendorInfo.id,
      },
    });

    return product;
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta.target[0];
      throw new Error(`Same ${target} Product already exists, Must be Unique`);
    }
    throw error;
  }
}

export async function updateProduct(
  categoryName: string | undefined,
  data: Prisma.ProductUncheckedUpdateInput,
  id: number
) {
  try {
    const existingProduct = await getProductById(id);
    if (!existingProduct) throw new Error("Product not found");

    let categoryId = existingProduct.categoryId;
    if (categoryName) {
      const category = await getCategoryByName(categoryName);
      if (!category) throw new Error("Category not found");
      categoryId = category.id;
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name || existingProduct.name,
        price: data.price || existingProduct.price,
        quantity: data.quantity || existingProduct.quantity,
        description: data.description || existingProduct.description,
        isActive:
          data.isActive !== undefined
            ? data.isActive
            : existingProduct.isActive,
        categoryId: categoryId,
      },
    });

    return updatedProduct;
  } catch (error: any) {
    if (error.code === "P2002") {
      const target = error.meta.target[0];
      throw new Error(`Same ${target} Product already exists, Must be Unique`);
    }
    throw error;
  }
}
export async function deleteProductByName(name: string) {
  const existingProduct = await getProductByName(name);
  if (!existingProduct) throw new Error(`Product not found`);

  await prisma.product.delete({ where: { name } });
}

export async function vendorProductsPurchased(vendorID: number) {
  try {
    const allPurchasedProducts = await prisma.product.findMany({
      where: {
        vendorId: vendorID,
        Purchasing: {
          some: {},
        },
      },
      select: {
        name: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
        Purchasing: {
          select: {
            user: {
              select: {
                fullName: true,
                email: true,
                country: true,
                city: true,
              },
            },
            status: true,
          },
        },
      },
    });
    return allPurchasedProducts;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching purchased vendor products");
  }
}

export async function countVendorPurchases(vendorID: number) {
  try {
    const purchaseCount = await prisma.purchasing.count({
      where: {
        product: {
          vendorId: vendorID,
        },
      },
    });

    return purchaseCount;
  } catch (error) {
    console.error(error);
    throw new Error("Error counting vendor purchases");
  }
}

export async function OutOfStockProducts(vendorId: number) {
  try {
    const outOfStock = await prisma.product.count({
      where: { id: vendorId, quantity: 0 },
    });
    return outOfStock;
  } catch (error) {
    console.error("Error counting out of stock products:", error);
    throw new Error("Error counting out of stock products");
  }
}

export async function countVendorMyProducts(vendorID: number) {
  try {
    const productCount = await prisma.product.count({
      where: { vendorId: vendorID },
    });

    return productCount;
  } catch (error) {
    console.error(error);
    throw new Error("Error counting vendor products");
  }
}

export async function vendorTotalEarnings(vendorID: number) {
  try {
    const purchasedProducts = await prisma.purchasing.findMany({
      where: {
        product: {
          vendorId: vendorID,
        },
      },
      select: {
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    const totalEarnings = purchasedProducts.reduce(
      (acc, purchase) => acc + purchase.product.price,
      0
    );

    return totalEarnings;
  } catch (error) {
    console.error(error);
    throw new Error("Error counting vendor purchases");
  }
}
