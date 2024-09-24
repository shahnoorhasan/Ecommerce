import { z } from "zod";

const name_Regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s!@#$%^&*()-_+=]*$/;

export const productNameSchema = z.object({
  name: z
    .string()
    .regex(name_Regex, "Name must contain letters")
    .min(3, "Name must be greater 3 words length")
    .max(20, "Name Cannot be more than 20 letters"),
});

export type createProductType = z.infer<typeof productNameSchema>;
