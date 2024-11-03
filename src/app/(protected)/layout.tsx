import Sidebar from "@/components/sidebar"
import { GlobalStateProvider } from "@/hooks/useGlobalState"
import { userSession } from "@/lib/session"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"

export default async function ProtectedRoot({ children }: PropsWithChildren) {
  const session = await userSession()

  if (!session.success) redirect("/auth")

  return (
    <GlobalStateProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <aside className="w-[260px] flex-shrink-0 overflow-x-hidden">
          <Sidebar />
        </aside>
        <main className="relative h-full w-full flex-1 overflow-auto transition-width p-3">
          {children}
        </main>
      </div>
    </GlobalStateProvider>
  )
}
