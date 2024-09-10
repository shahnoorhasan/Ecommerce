import { z } from "zod";

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/; // starts with a letter can contain numbers
const phonenumberRegex = /^(?:\+92|03)\d{9}$/;
const counrtyRegex = /^[a-zA-Z]+$/;
const cityRegex = /^[a-zA-Z]+$/;

export const createUserSchema = z.object({
  username: z.string().regex(usernameRegex, "Invalid Username"),
  email: z.string().email(),
  phoneNumber: z.string().regex(phonenumberRegex, "Invalid Phone Number"),
  country: z
    .string()
    .regex(counrtyRegex, "Counrty name can only contain aplhabets"),
  city: z.string().regex(cityRegex, "City name can only contain aplhabets"),
});

export type createUserType = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  username: z.string().regex(usernameRegex, "Invalid Username").optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
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
