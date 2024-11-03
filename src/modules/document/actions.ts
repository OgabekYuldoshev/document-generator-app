"use server"

import type { z } from "zod";
import type { newDocumentSchema } from "./schema";
import { db } from "@/lib/db";

export async function createNewDocumentAction(values: z.infer<typeof newDocumentSchema>) {
  try {
    const document = await db.createMetaDocument(values)
    return { success: true, document }
  } catch (error) {
    return { success: false, document: null }
  }
}