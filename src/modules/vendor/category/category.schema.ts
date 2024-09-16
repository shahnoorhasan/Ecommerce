import { z } from "zod";
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
export const createCategorySchema = z.object({
  name: z.string().regex(nameRegex, "Please enter only words"),
});

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().regex(nameRegex, "Please enter only words").optional(),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
