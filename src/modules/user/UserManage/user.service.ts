import { Prisma, User } from "@prisma/client";
import prisma from "../../../utils/db.util";

export async function getAnyUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User at id: ${id} does not exist`);
  return user;
}

export async function getAllUserById() {
  const users = await prisma.user.findMany({ orderBy: { id: "desc" } });
  return users;
}

export async function updateAnyUser(
  data: Prisma.UserUncheckedUpdateInput,
  id: number
) {
  const existingUser = await getAnyUserById(id);
  if (!existingUser) throw new Error(`User does not exist`);
  await prisma.user.update({
    data: {
      fullName: data.fullName || existingUser.fullName,
      email: data.email || existingUser.email,
      password: data.password || existingUser.password,
      phoneNumber: data.phoneNumber || existingUser.phoneNumber,
      country: data.country || existingUser.country,
      city: data.city || existingUser.city,
    },
    where: { id },
  });
}

export async function deleteAnyUser(id: number) {
  const existingUser = await getAnyUserById(id);
  if (!existingUser) throw new Error(`User does not exist`);
  await prisma.user.delete({ where: { id } });
}
