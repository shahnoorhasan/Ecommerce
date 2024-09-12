import { Prisma, User } from "@prisma/client";
import prisma from "../../utils/db.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../utils/env.util";

export async function AnyUserSignUp(data: Prisma.UserUncheckedCreateInput) {
  try {
    const enc_password = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: enc_password,
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

export async function AnyUserSignIn(
  email: string,
  current_password: string
): Promise<{ user: User; token: string } | undefined> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error(`This email is not registered `);
    const passwordMatch = await bcrypt.compare(current_password, user.password);
    if (!passwordMatch) throw new Error(`Invalid Password`);

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
      },
      ENV.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { user, token };
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
