import { z } from "zod";

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
