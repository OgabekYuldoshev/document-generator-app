import { getDocumentAction } from "@/modules/document/actions";
import DocumentProvider from "@/modules/document/provider";
import { FileText } from "lucide-react";
import React, { type PropsWithChildren } from "react";

export default async function DocumentLayout({ children, params }: PropsWithChildren<{ params: { cuid: string } }>) {
    const content = await getDocumentAction(params.cuid)
    if (!content.success || !content.document) {
        return (
            <div className="w-full h-full flex flex-col items-center pt-12">
                <FileText />
                <h3 className="font-bold text-lg">No document found.</h3>
                <p className="text-muted-foreground text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident.</p>
            </div>
        );
    }
    return <DocumentProvider item={content.document}>{children}</DocumentProvider>;
}
