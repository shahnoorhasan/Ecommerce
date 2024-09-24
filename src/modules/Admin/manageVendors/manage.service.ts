import { Prisma } from "@prisma/client";
import prisma from "../../../utils/db.util";

export async function getTotalVendorsCount() {
  try {
    const vendorCount = await prisma.user.count({
      orderBy: { id: "desc" },
      where: { role: "Vendor" },
    });
    return vendorCount;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total vendor count");
  }
}

export async function getAllVendorData() {
  try {
    const vendorsData = await prisma.user.findMany({
      orderBy: { id: "desc" },
      where: { role: "Vendor" },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        country: true,
        city: true,
        vendorCatRequests: { select: { name: true, status: true } },
      },
    });
    if (vendorsData === null) throw new Error(`No vendors exist`);
    return vendorsData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching all vendors data");
  }
}

export async function getVendorsByCategoryName(name: string) {
  try {
    const category = await prisma.category.findMany({
      where: { name },
      select: {
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            vendor: {
              select: {
                id: true,
                fullName: true,
                email: true,
                country: true,
                city: true,
                vendorCatRequests: {
                  select: { id: true, name: true, status: true },
                },
              },
            },
          },
        },
      },
    });
    if (category[0]?.Product.length === 0) {
      return `Category has no products`;
    }
    return category;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching all vendors data");
  }
}

export async function revertVendor(id: number) {
  try {
    const vendor = await prisma.user.findUnique({
      where: { id },
      select: { role: true },
    });
    if (!vendor || vendor.role !== "Vendor") {
      throw new Error(`Vendor with ID ${id} not found or is not a vendor.`);
    }
    const updatedVendor = await prisma.user.update({
      where: { id },
      data: { role: "Customer" },
      select: { id: true, role: true },
    });

    return updatedVendor;
  } catch (error) {
    console.error(error);
    throw new Error(`No vendor at ${id}`);
  }
}

export async function deactivatedVendorProducts(vendorId: number) {
  try {
    const result = await prisma.product.updateMany({
      where: { vendorId },
      data: { isActive: false },
    });
    if (result.count === 0) {
      throw new Error(`No products found for vendor with ID ${vendorId}`);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(
        `Error deactivating products for vendor with ID ${vendorId}: ${error.message}`
      );
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error(
        "An unexpected error occurred while deactivating products."
      );
    }
  }
}

export async function deleteVendorCategoryRequests(id: number) {
  try {
    const vendor = await prisma.vendorCategoryRequests.deleteMany({
      where: { userId: id },
    });
    if (!vendor) throw new Error(`Vendor at ID ${id} does not exist`);
    return vendor;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }
}
