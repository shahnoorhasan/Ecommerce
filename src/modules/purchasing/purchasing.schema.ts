import { z } from "zod";

export const createPurchasingSchema = z.object({
  productName: z.string(),
});

export type createPurchasingType = z.infer<typeof createPurchasingSchema>;
