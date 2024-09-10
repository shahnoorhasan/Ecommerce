import { z } from "zod";
export const createCategorySchema = z.object({
  name: z.string(),
});

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string(),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
