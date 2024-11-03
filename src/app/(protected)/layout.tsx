import Sidebar from "@/components/sidebar"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"
import { getSessionAction } from "../(auth)/auth/actions"

export default async function ProtectedRoot({ children }: PropsWithChildren) {
  const session = await getSessionAction()

  if (!session.success) redirect("/auth")

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="relative h-full w-full flex-1 overflow-auto transition-width p-3">
        {children}
      </main>
    </div>
  )
}
