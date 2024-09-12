import dotenv from "dotenv";
import { string, z } from "zod";
dotenv.config();

// const env_schema = z.object({
//     PORT: z.number(),
//     DATABASE_URL: z.string(),
//     NAME: z.string()
// })

export const ENV = {
  PORT: process.env.PORT ?? 5001,
  JWT_SECRET: process.env.JWT_SECRET,
};
