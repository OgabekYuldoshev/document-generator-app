"use client"

import React from "react"
import useAlert from "@/hooks/useAlert"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import NewDocumentButton from "./new-document-button"
import Nav from "./nav"
import { logoutAction } from "@/modules/auth/actions"

export default function Sidebar() {
  const [AlertProvider, onAlert] = useAlert()

  function handleLogout() {
    onAlert({
      title: "Log Out of Your Account?",
      description:
        "Logging out will end your current session. Do you want to continue?",
      onResolve(value) {
        if (value) {
          logoutAction()
        }
      },
    })
  }

  return (
    <TooltipProvider>
      <aside className="w-[260px] flex-shrink-0 overflow-x-hidden transition-300">
        <div className="flex flex-col w-full h-full border-r">
          <div className="p-3 flex justify-between">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleLogout}
                >
                  <LogOut />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Log out to your account</TooltipContent>
            </Tooltip>
            <NewDocumentButton />
          </div>
          <div className="flex flex-col px-3 gap-6 mt-6">
            <Nav
              title="Main"
              items={[
                {
                  label: "Documents",
                  href: "/",
                  icon: "FileText",
                },
              ]}
            />
          </div>
          <AlertProvider />
        </div>
      </aside>
    </TooltipProvider>
  )
}
