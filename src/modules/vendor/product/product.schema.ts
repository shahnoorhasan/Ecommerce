import { z } from "zod";

const name_Regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s!@#$%^&*()-_+=]*$/;
export const createProductSchema = z.object({
  name: z
    .string()
    .regex(name_Regex, "Name must contain letters")
    .min(3, "Name must be greater 3 words length")
    .max(20, "Name Cannot be more than 20 letters"),
  price: z
    .number()
    .min(1, "price must be greater than 0")
    .max(999999, "Please recheck the price"),
  quantity: z.number().min(1, "quantity must be greater than 0"),
  description: z
    .string()
    .min(50, "description must be greater than 50 letters")
    .max(200, "description must be less 200 letters"),
});

export type createProductType = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z
    .string()
    .nonempty("name is required")
    .regex(name_Regex, "Name must contain letters")
    .min(3, "Name must be greater 3 words length")
    .max(20, "Name Cannot be more than 20 letters")
    .optional(),
  price: z
    .number()
    .min(1, "price must be greater than 0")
    .max(10, "Please Recheck the price")
    .optional(),
  quantity: z
    .number()
    .min(1, "quantity must be greater than 0")
    .max(5, "Please Recheck quantity")
    .optional(),
  description: z
    .string()
    .min(50, "description must be greater than 50 letters")
    .max(200, "description must be less 200 letters")
    .optional(),
  isActive: z.boolean().optional(),
});

export type updateProductType = z.infer<typeof updateProductSchema>;
