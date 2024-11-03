import Documents from "@/components/documents"
import PageHeader from "@/components/page-header"
import { Title } from "@/components/title"
import { getAllDocumentsAction } from "@/modules/document/actions"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import React from "react"

export default async function Page() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["documents-list"],
    async queryFn() {
      const { documents } = await getAllDocumentsAction()
      return documents
    },
    initialData: [],
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col">
        <PageHeader items={["Documents"]} />
        <div className="mx-auto w-full max-w-screen-xl">
          <Title
            title="Documents"
            description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla."
            className="mt-4"
          />
          <Documents />
        </div>
      </div>
    </HydrationBoundary>
  )
}
