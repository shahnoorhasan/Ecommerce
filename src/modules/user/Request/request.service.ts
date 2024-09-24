import prisma from "../../../utils/db.util";

export async function sendVendorRequest(email: string) {
  try {
    const vendor = await prisma.user.findUnique({
      where: { email },
      select: { id: true, fullName: true, role: true, email: true },
    });

    if (!vendor) throw new Error("Email does not belong to any user");

    if (vendor.role === "SuperAdmin")
      throw new Error("Admin cannot be registered as vendor");

    if (vendor.role === "Vendor") throw new Error("You are already a vendor");

    const existingRequest = await prisma.vendorRequest.findFirst({
      where: { userId: vendor.id },
    });

    if (existingRequest && existingRequest.status === "pending") {
      throw new Error(
        "Your request has been registered and is under approval, cannot make a new request"
      );
    }
    if (existingRequest && existingRequest.status === "reject") {
      throw new Error("Your request was rejected");
    }
    if (
      existingRequest &&
      existingRequest.status === "accepted" &&
      vendor.role === "Customer"
    ) {
      throw new Error("This User is blocked to be a vendor");
    }
    const vendorData = await prisma.vendorRequest.create({
      data: {
        userId: vendor.id,
      },
    });

    return vendorData;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(`Error sending vendor request: ${error.message}`);
  }
}
