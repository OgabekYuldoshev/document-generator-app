"use server"

import type { z } from "zod";
import type { newDocumentSchema } from "./schema";
import { db } from "@/lib/db";
import sift from "sift";
import { firstBy } from "thenby"

export async function createNewDocumentAction(values: z.infer<typeof newDocumentSchema>) {
  try {
    const document = await db.createMetaDocument(values)
    return { success: true, document }
  } catch (error) {
    return { success: false, document: null }
  }
}

export async function getAllDocumentsAction() {
  try {
    const meta = await db.getMeta()
    const documents = meta.documents.filter(sift({
      status: {
        $not: "deleted"
      }
    })).sort(firstBy("createdAt", { direction: 'desc' }))
    return { success: true, documents: documents }
  } catch (error) {
    return { success: false, documents: [] }
  }
}


export async function removeDocumentAction(id: string) {
  try {
    await db.updateMetaDocument({ id, document: { status: "deleted" } })

    return { success: true, message: 'Removed successfully' }
  } catch (error) {
    return { success: false, message: "Remove document error" }
  }
}