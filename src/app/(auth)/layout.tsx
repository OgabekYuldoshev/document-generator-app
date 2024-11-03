import { redirect } from "next/navigation"
import React, { type PropsWithChildren } from "react"
import { getSessionAction } from "./auth/actions"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getSessionAction()

  if (session.success) redirect("/")

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {children}
    </div>
  )
}
