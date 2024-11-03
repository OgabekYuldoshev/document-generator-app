"use client"
import React from "react"
import useAlert from "@/hooks/useAlert"
import { deleteSession } from "@/lib/session"
import { Button } from "./ui/button"
import { LogOut, PanelRight, PanelRightOpen, SquarePen } from "lucide-react"
import { Tooltip, TooltipProvider } from "./ui/tooltip"
import CollapsedButton from "./collapsed-button"
import NewDocumentButton from "./new-document-button"

export default function Sidebar() {
  const [AlertProvider, onAlert] = useAlert()

  function handleLogout() {
    onAlert({
      title: "Log Out of Your Account?",
      description:
        "Logging out will end your current session. Do you want to continue?",
      onResolve(value) {
        if (value) {
          deleteSession()
        }
      },
    })
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col w-full h-full border-r">
        <div className="p-3 flex justify-between">
          <CollapsedButton />
          <NewDocumentButton />
        </div>
        <div className="mt-auto border-t p-3">
          <Button
            className="w-full !justify-start"
            variant="secondary"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
        <AlertProvider />
      </div>
    </TooltipProvider>
  )
}
