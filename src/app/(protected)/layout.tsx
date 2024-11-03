import Sidebar from "@/components/sidebar"
import { getSessionAction } from "@/modules/auth/actions"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"

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
