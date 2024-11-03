"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Loader2, SquarePen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { constantCase } from "change-case"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { newDocumentSchema } from "@/modules/document/schema"
import { createNewDocumentAction } from "@/modules/document/actions"

const NewDocumentButton = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button onClick={() => setOpen(true)} size="icon" variant="secondary">
            <SquarePen />
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Document</TooltipContent>
      </Tooltip>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New document</DialogTitle>
            <DialogDescription>
              Create a new document in one click
            </DialogDescription>
          </DialogHeader>
          <Form />
        </DialogContent>
      </Dialog>
    </>
  )
}

type NewDocumentFormValue = z.infer<typeof newDocumentSchema>
function Form() {
  const router = useRouter()
  const form = useForm<NewDocumentFormValue>({
    mode: "onTouched",
    resolver: zodResolver(newDocumentSchema),
  })

  async function onSubmit(values: NewDocumentFormValue) {
    const { success, document } = await createNewDocumentAction(values)
    if (success) {
      toast.success("Document created successfully")
      router.push(`/document/${document?.id}`)
    } else {
      toast.error("Failed to create document")
    }
  }
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
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
          </div>
          <div className="flex flex-col space-y-1.5">
            <FormField
              name="key"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter" />
                  </FormControl>
                  {field.value && (
                    <FormDescription>
                      Your key should be like: {constantCase(field.value)}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="animate-spin" />
              )}
              Create
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default NewDocumentButton
