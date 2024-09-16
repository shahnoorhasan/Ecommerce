import { z } from "zod";

export const vendorRequestApprovalSchema = z.object({
  action: z.string().toLowerCase(),
});

export type vendorRequestApprovalType = z.infer<
  typeof vendorRequestApprovalSchema
>;
