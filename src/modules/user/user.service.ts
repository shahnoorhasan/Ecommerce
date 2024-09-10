import { Prisma } from "@prisma/client";
import prisma from "../../utils/db.util";
import { createUserSchema } from "./user.schema";
import { any } from "zod";

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User at id: ${id} does not exist`);
  return user;
}

export async function getAllUserById() {
  const users = await prisma.user.findMany({ orderBy: { id: "desc" } });
  return users;
}

export async function createUser(data: Prisma.UserUncheckedCreateInput) {
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        country: data.country,
        city: data.city,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`The error is ${error}`);
  }
}

export async function updateUser(
  data: Prisma.UserUncheckedUpdateInput,
  id: number
) {
  const existingUser = await getUserById(id);
  if (!existingUser) throw new Error(`User does not exist`);
  await prisma.user.update({
    data: {
      username: data.username || existingUser.username,
      email: data.email || existingUser.email,
      phoneNumber: data.phoneNumber || existingUser.phoneNumber,
      country: data.country || existingUser.country,
      city: data.city || existingUser.city,
    },
    where: { id },
  });
}

export async function deleteUser(id: number) {
  const existingUser = await getUserById(id);
  if (!existingUser) throw new Error(`User does not exist`);
  await prisma.user.delete({ where: { id } });
}
