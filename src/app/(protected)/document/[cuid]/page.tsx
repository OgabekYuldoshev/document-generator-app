import React from "react"

export default function Page({ params }: { params: { cuid: string } }) {
  return <div>Page: {params.cuid}</div>
}
