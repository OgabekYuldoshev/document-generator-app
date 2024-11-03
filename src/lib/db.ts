import "server-only"

import { existsSync } from "fs"
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { createId } from "@paralleldrive/cuid2"
import { constantCase } from "change-case"
import sift from "sift"
import { BASIC_HTML } from "@/constants";

export interface MetaDocument {
  id: string;
  title: string;
  key: string;
  status: "published" | 'deleted'
  createdAt: string
  updatedAt: string
}

export interface MetaUser {
  login: string;
  pass: string
  role: "admin" | "user"
}

export interface MetaData {
  users: MetaUser[],
  documents: MetaDocument[]
}

const defaultMetaJson = {
  users: [
    {
      login: process.env.ADMIN_LOGIN || 'admin',
      pass: process.env.ADMIN_PASSWORD || 'admin12345',
      role: 'admin'
    }
  ],
  documents: []
} satisfies MetaData

const metaDirName = '.meta'
const metaFileName = "meta.json"

class MetaDatabase {
  private rootPath: string = ''
  private static instance: MetaDatabase;

  constructor() {
    this.init()
  }
  // Create and inilize a new metadatabase
  private async init() {
    this.rootPath = path.join(process.cwd(), metaDirName)
    if (!existsSync(this.rootPath)) {
      await mkdir(this.rootPath, { recursive: true })
      await writeFile(path.join(this.rootPath, 'meta.json'), JSON.stringify(defaultMetaJson, null, 2))
    }
  }
  // Get meta.json file
  public async getMeta() {
    const filePath = path.join(this.rootPath, metaFileName)
    const jsonString = await readFile(filePath, 'utf8')
    return JSON.parse(jsonString) as MetaData
  }

  // Update meta.json file
  public async updateMetaFile(content: MetaData) {
    const filePath = path.join(this.rootPath, metaFileName)
    await writeFile(filePath, JSON.stringify(content, null, 2))
  }

  // Create new meta document
  public async createMetaDocument({ title, key }: { title: string, key: string }) {
    const meta = await this.getMeta()
    const currentDate = new Date().toISOString()

    const newDocument = {
      id: createId(),
      title,
      key: constantCase(key),
      status: 'published',
      createdAt: currentDate,
      updatedAt: currentDate
    } satisfies MetaDocument

    await this.updateMetaDocumentContent({
      id: newDocument.id,
      content: BASIC_HTML
    })

    const documentsByKeys = meta.documents.filter(sift({
      $and: [
        {
          status: {
            $not: "deleted",
          },
        },
        {
          key: {
            $regex: newDocument.key,
          },
        },
      ],
    }))

    if (documentsByKeys.length > 0) {
      newDocument.key += `_${documentsByKeys.length + 1}`
    }

    meta.documents.push(newDocument)

    await this.updateMetaFile(meta)

    return newDocument
  }

  // Get meta document content
  public async getMetaDocumentContent({ id }: { id: string }) {
    return await readFile(path.join(this.rootPath, "documents", `${id}.html`), 'utf8')
  }

  // Update or create meta document content
  public async updateMetaDocumentContent({ id, content }: { id: string, content: string }) {
    const documentDirPath = path.join(this.rootPath, "documents")

    if (!existsSync(documentDirPath)) {
      await mkdir(documentDirPath, { recursive: true });
    }

    await writeFile(path.join(documentDirPath, `${id}.html`), content)

    return this.getMetaDocumentContent({ id })
  }

  // Update meta document fields
  public async updateMetaDocument({ id, document }: { id: string, document: Partial<Omit<MetaDocument, "id" | "createdAt" | 'updatedAt'> & { content: string }> }) {
    const meta = await this.getMeta()
    const updatedDocument = meta.documents.find((doc) => doc.id === id)
    if (!updatedDocument) throw new Error("NOT_FOUND")

    for (const [key, value] of Object.entries(document)) {

      if (key === 'document') {
        await this.updateMetaDocumentContent({ id, content: value })
        continue;
      }

      (updatedDocument as any)[key] = value
    }
    updatedDocument.updatedAt = new Date().toISOString()

    this.updateMetaFile(meta)

    return updatedDocument
  }

  // Get instance of Metadatabase
  public static getInstance(): MetaDatabase {
    if (!MetaDatabase.instance) {
      MetaDatabase.instance = new MetaDatabase();
    }

    return MetaDatabase.instance;
  }
}

export const db = MetaDatabase.getInstance()