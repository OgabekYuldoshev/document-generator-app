import Sidebar from "@/components/sidebar"
import { GlobalStateProvider } from "@/hooks/useGlobalState"
import { redirect } from "next/navigation"
import type { PropsWithChildren } from "react"
import { getSessionAction } from "../(auth)/auth/actions"

export default async function ProtectedRoot({ children }: PropsWithChildren) {
  const session = await getSessionAction()

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
