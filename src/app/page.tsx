"use client"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import React from "react"

export default function Page() {
  async function authFn() {
    const res = await client.auth.login.$post({
      login: "Test",
      pass: "122334456y67",
    })
  }

  return (
    <div>
      <Button onClick={() => authFn()}>Salom</Button>
    </div>
  )
}
