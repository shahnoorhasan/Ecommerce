import { z } from "zod";

const email_Regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const sendVendorRequestSchema = z.object({
  email: z
    .string()
    .regex(email_Regex, "invalid email, only @gmail domains are available")
    .max(60, "Email cannot be more than 60 letters"),
});

export type sendVendorRequestType = z.infer<typeof sendVendorRequestSchema>;

const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;

export const vendorCategoryRequestSchema = z.object({
  name: z
    .string()
    .regex(nameRegex, "Please enter words only")
    .min(3, "Category Name must be more than 3 letters")
    .max(20, "Category Name cannot be of more than 20 letters"),
});

export type vendorCategoryRequestType = z.infer<
  typeof vendorCategoryRequestSchema
>;
