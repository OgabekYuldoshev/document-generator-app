'use client'

import PageHeader from "@/components/page-header"
import { Title } from "@/components/title"
import { useDocumentContext } from "@/modules/document/provider"
import React from "react"

export default function Page() {
  const { item } = useDocumentContext()

  return (
    <div className="flex flex-col">
      <PageHeader items={[
        { label: 'Documents', href: "/" },
        item.title
      ]} />
      <div className="mx-auto w-full max-w-screen-xl">
        <Title
          title={item.title}
          description={item.key}
          className="mt-4"
        />
      </div>
    </div>
  )
}
