"use client"
import {
  getAllDocumentsAction,
  removeDocumentAction,
} from "@/modules/document/actions"
import { useMutation, useQuery } from "@tanstack/react-query"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, FileText, Loader2, Pen, Trash } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"
import { toast } from "sonner"

const Documents = () => {
  const { data, isFetched, refetch } = useQuery({
    queryKey: ["documents-list"],
    async queryFn() {
      const { documents } = await getAllDocumentsAction()
      return documents
    },
    initialData: [],
    retry: false,
    refetchOnWindowFocus: false,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: removeDocumentAction,
    onSuccess({ success, message }) {
      if (success) {
        toast.success(message)
        refetch()
      } else {
        toast.error(message)
      }
    },
  })

  if (!isFetched) {
    return (
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 gap-2 mt-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  return (
    <ul className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 gap-2 mt-6">
      {data.map((document) => (
        <li
          key={document.id}
          className="relative border p-3 flex flex-col rounded-md"
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-3 right-3">
              <EllipsisVertical size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href={`/document/${document.id}`}>
                  <Pen />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => mutate(document.id)}
              >
                {isPending ? <Loader2 className="animate-spin" /> : <Trash />}
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <FileText />
          <div className="mt-4">
            <h4
              title={document.title}
              className="line-clamp-1 text-sm leading-6"
            >
              {document.title}
            </h4>
            <p className="line-clamp-1 text-xs text-muted-foreground">
              {document.key}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Documents
