"use client"
import React from "react"
import LogoutButton from "./logout-button"

export default function Sidebar() {
  return (
    <aside className="fixed w-[300px] border-r h-full">
      Sidebar
      <LogoutButton />
    </aside>
  )
}
