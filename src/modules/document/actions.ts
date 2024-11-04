"use server"

import { db } from "@/lib/db";
import sift from "sift";
import { firstBy } from "thenby"
import type { z } from "zod";
import type { newDocumentSchema } from "./schema";

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

export async function getDocumentAction(id: string) {
  try {
    const meta = await db.getMeta()
    const document = meta.documents.find(sift({ id }))
    if (!document) return { success: false, document: null }
    const content = await db.getMetaDocumentContent({ id: document.id })
    return { success: true, document: { ...document, content } }
  } catch (error) {
    return { success: false, document: null }
  }
}