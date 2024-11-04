'use client'
import type { MetaDocument } from "@/lib/db";
import React, { useContext, type PropsWithChildren } from "react";

type Single = { content: string } & MetaDocument

interface Context {
    item: Single;
}

const DocumentContext = React.createContext<Context>({
    item: {} as Single,
});
export default function DocumentProvider({
    item,
    children
}: PropsWithChildren<{ item: Single }>) {
    return (
        <DocumentContext.Provider value={{ item }}>
            {children}
        </DocumentContext.Provider>
    );
}

export const useDocumentContext = () => {
    const ctx = useContext(DocumentContext)

    if (!ctx) {
        throw new Error("useDocumentContext must be used within a DocumentProvider")
    }

    return ctx
}