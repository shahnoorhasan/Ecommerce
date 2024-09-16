import prisma from "../../../utils/db.util";

export async function getPendingVendorRequests() {
  try {
    const requests = await prisma.vendorRequest.findMany({
      where: { status: "pending" },
      include: {
        user: {
          select: { id: true, email: true, fullName: true, role: true },
        },
      },
    });
    return requests;
  } catch (error: any) {
    console.error("Error fetching vendor requests:", error.message);
    throw new Error("Could not fetch vendor requests");
  }
}

export async function approveVendorRequest(
  requestId: number,
  action: "accept" | "reject"
) {
  try {
    const request = await prisma.vendorRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });
    if (!request) throw new Error(`No Request found`);
    if (action === "accept") {
      await prisma.user.update({
        where: { id: request.id },
        data: { role: "Vendor" },
      });
    }
    await prisma.vendorRequest.update({
      where: { id: requestId },
      data: { status: action === "accept" ? "accepted" : "rejected" },
    });
    return { success: true, message: `Request has been ${action}ed` };
  } catch (error: any) {
    console.error("Error handling vendor request:", error.message);
    throw new Error("Could not process the vendor request");
  }
}

export async function getPendingVendorCategoryRequests() {
  try {
    const requests = await prisma.vendorCategoryRequests.findMany({
      where: { status: "pending" },
      include: {
        user: {
          select: { id: true, email: true, fullName: true },
        },
      },
    });
    return requests;
  } catch (error: any) {
    console.error("Error fetching vendor category requests:", error.message);
    throw new Error("Could not fetch vendor category requests");
  }
}

export async function approveCategoryRequests(
  requestId: number,
  action: "accept" | "reject"
) {
  try {
    const request = await prisma.vendorCategoryRequests.findUnique({
      where: { id: requestId },
      include: { user: true },
    });
    if (!request) throw new Error(`No Request found`);
    if (action === "accept") {
      await prisma.category.create({
        data: {
          name: request.name,
        },
      });
    }
    await prisma.vendorCategoryRequests.update({
      where: { id: requestId },
      data: { status: action === "accept" ? "accepted" : "rejected" },
    });
    return { success: true, message: `Request has been ${action}ed` };
  } catch (error: any) {
    console.error("Error handling vendor category request:", error.message);
    throw new Error("Could not process the vendor category request");
  }
}
