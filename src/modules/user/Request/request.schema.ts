import { z } from "zod";

const email_Regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const sendVendorRequestSchema = z.object({
  email: z
    .string()
    .regex(email_Regex, "invalid email, only @gmail domains are available")
    .max(60, "Email cannot be more than 60 letters"),
});

export type sendVendorRequestType = z.infer<typeof sendVendorRequestSchema>;
