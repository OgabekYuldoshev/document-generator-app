import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(3),
  pass: z.string().min(6),
})