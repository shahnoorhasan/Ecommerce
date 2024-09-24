import { z } from "zod";
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;

export const CategoryNameSchema = z.object({
  name: z.string().regex(nameRegex, "Please enter only words"),
});

export type CategoryNameType = z.infer<typeof CategoryNameSchema>;

export const VendorIdSchema = z.object({
  id: z.number(),
});

export type VendorIdType = z.infer<typeof VendorIdSchema>;
