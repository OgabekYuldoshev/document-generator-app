import { z } from "zod";

export const newDocumentSchema = z.object({
  title: z.string().min(5),
  key: z.string().min(3),
})

export const updateDocumentSchema = z.object({
  title: z.string().min(5),
  key: z.string().min(3),
})