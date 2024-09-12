import { z } from "zod";

const fullnameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/; // must include letters and digits and special characters
const phonenumberRegex = /^(?:\+92|03)\d{9}$/;
const counrtyRegex = /^[a-zA-Z]+$/;
const cityRegex = /^[a-zA-Z]+$/;

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "Full name too short",
    })
    .max(30, {
      message: "Full name too long, cant be more than 30 letters",
    })
    .regex(fullnameRegex, "Can Only contain Letters"),
  email: z.string().endsWith("@gmail.com", {
    message: "only gmail domains are valid",
  }),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must inculde letters, digits and special characters"
    ),
  phoneNumber: z.string().regex(phonenumberRegex, "Invalid Phone Number"),
  country: z
    .string()
    .regex(counrtyRegex, "Counrty name can only contain aplhabets"),
  city: z.string().regex(cityRegex, "City name can only contain aplhabets"),
});

export type createUserType = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "Full name too short",
    })
    .max(30, {
      message: "Full name too long, cant be more than 30 letters",
    })
    .regex(fullnameRegex, "Can Only contain Letters")
    .optional(),
  email: z
    .string()
    .endsWith("@gmail.com", {
      message: "only gmail domains are valid",
    })
    .optional(),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must inculde letters, digits and special characters"
    ),
  phoneNumber: z
    .string()
    .regex(phonenumberRegex, "Invalid Phone Number")
    .optional(),
  country: z
    .string()
    .regex(counrtyRegex, "Counrty name can only contain aplhabets")
    .optional(),
  city: z
    .string()
    .regex(cityRegex, "City name can only contain aplhabets")
    .optional(),
});

export type updateUserType = z.infer<typeof updateUserSchema>;

export const UserSignInSchema = z.object({
  email: z.string().endsWith("@gmail.com", {
    message: "only gmail domains are valid",
  }),
  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must inculde letters, digits and special characters"
    ),
});

export type UserSignInType = z.infer<typeof UserSignInSchema>;
