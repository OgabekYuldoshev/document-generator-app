"use client";

import PageHeader from "@/components/page-header";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateDocumentMetaAction } from "@/modules/document/actions";
import { useDocumentContext } from "@/modules/document/provider";
import { updateDocumentSchema } from "@/modules/document/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type FormValue = z.infer<typeof updateDocumentSchema>;
export default function Page() {
    const { item } = useDocumentContext();
    const router = useRouter()
    const form = useForm<FormValue>({
        resolver: zodResolver(updateDocumentSchema),
        defaultValues: {
            title: item.title || '',
            key: item.key || ''
        }
    });

    async function onSubmit(values: FormValue) {
        const res = await updateDocumentMetaAction({
            id: item.id,
            document: values
        })
        if (res.success) {
            toast.success("Document updated successfully")
            router.refresh()
        } else {
            toast.error("Document updated error")
        }
    }

    return (
        <div className="flex flex-col">
            <PageHeader
                items={[
                    { label: "Documents", href: "/" },
                    { label: item.title, href: `/document/${item.id}` },
                    "Meta data",
                ]}
            />
            <div className="mx-auto w-full max-w-screen-xl">
                <Title title={item.title} description={item.key} className="mt-4" />
                <div className="border rounded-md p-6 mt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                name="title"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="key"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Key</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="lg:col-span-3 col-span-2 flex justify-end">
                                <Button disabled={form.formState.isSubmitting || !form.formState.isDirty} type="submit">
                                    {
                                        form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : <Save />
                                    }
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
