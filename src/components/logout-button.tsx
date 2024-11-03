"use client"
import React from "react"
import { Button } from "./ui/button"
import useAlert from "@/hooks/useAlert"
import { deleteSession } from "@/lib/session"

const LogoutButton = () => {
  const [AlertProvider, onAlert] = useAlert()

  return (
    <>
      <Button
        onClick={() => {
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
        }}
      >
        Logout
      </Button>
      <AlertProvider />
    </>
  )
}

export default LogoutButton
