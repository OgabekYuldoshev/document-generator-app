import Sidebar from "@/components/sidebar"
import { userSession } from "@/lib/session"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"

export default async function ProtectedRoot({ children }: PropsWithChildren) {
  const session = await userSession()
  if (!session.success) redirect("/auth")

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Sidebar />
      <section className="ml-[300px] p-6">{children}</section>
    </div>
  )
}
