import React, { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen grid place-content-center">{children}</div>
  )
}
