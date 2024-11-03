import { userSession } from "@/lib/session"
import { redirect } from "next/navigation"
import React, { type PropsWithChildren } from "react"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await userSession()

  if (session.success) redirect("/")

  return (
    <div className="w-full h-screen grid place-content-center">{children}</div>
  )
}
