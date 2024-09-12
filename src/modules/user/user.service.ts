import { Prisma, User } from "@prisma/client";
import prisma from "../../utils/db.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserSchema } from "./user.schema";
import { any } from "zod";
import { error } from "console";

export async function getAnyUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User at id: ${id} does not exist`);
  return user;
}

export async function getAllUserById() {
  const users = await prisma.user.findMany({ orderBy: { id: "desc" } });
  return users;
}

// export async function createAnyUser(data: Prisma.UserUncheckedCreateInput) {
//   try {
//     const enc_password = await bcrypt.hash(data.password, 10);
//     const user = await prisma.user.create({
//       data: {
//         fullname: data.fullname,
//         email: data.email,
//         password: enc_password,
//         phoneNumber: data.phoneNumber,
//         country: data.country,
//         city: data.city,
//       },
//     });
//     const token = jwt.sign(
//       { user_id: data.id, user_email: data.email },
//       "shhhh",
//       {
//         expiresIn: "1h",
//       }
//     );

//     return { user, token };
//   } catch (error: any) {
//     throw new Error(`The error is ${error}`);
//   }
// }

// export async function AnyUserSignIn(
//   email: string,
//   current_password: string
// ): Promise<{ user: User; token: string } | undefined> {
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) throw new Error(`This email is not registered `);
//     const passwordMatch = await bcrypt.compare(current_password, user.password);
//     if (!passwordMatch) throw new Error(`Invalid Password`);

//     const token = jwt.sign(
//       {
//         user_id: user.id,
//         email: user.email,
//       },
//       "shhhh",
//       { expiresIn: "1h" }
//     );
//     return { user, token };
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// }
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
