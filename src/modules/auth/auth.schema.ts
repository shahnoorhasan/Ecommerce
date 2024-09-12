import { z } from "zod";

const full_nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const password_Regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/; // must include letters and digits and special characters
const phone_numberRegex = /^(?:\+92|03)\d{9}$/;
const country_Regex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const city_Regex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;

export const AnyUserSignUpSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "Full name too short",
    })
    .max(30, {
      message: "Full name too long, cant be more than 30 letters",
    })
    .regex(full_nameRegex, "Can Only contain Letters"),
  email: z.string().endsWith("@gmail.com", {
    message: "only gmail domains are valid",
  }),
  password: z
    .string()
    .regex(
      password_Regex,
      "Password must include letters, digits and special characters"
    ),
  phoneNumber: z.string().regex(phone_numberRegex, "Invalid Phone Number"),
  country: z
    .string()
    .regex(country_Regex, "Country name can only contain alphabets"),
  city: z.string().regex(city_Regex, "City name can only contain alphabets"),
});

export type AnyUserSignUpType = z.infer<typeof AnyUserSignUpSchema>;

export const AnyUserSignInSchema = z.object({
  email: z.string().endsWith("@gmail.com", {
    message: "only gmail domains are valid",
  }),
  password: z
    .string()
    .regex(
      password_Regex,
      "Password must include letters, digits and special characters"
    ),
});

export type AnyUserSignInType = z.infer<typeof AnyUserSignInSchema>;
