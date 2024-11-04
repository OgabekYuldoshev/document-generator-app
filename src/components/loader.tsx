import { Loader2 } from "lucide-react"
import React from "react"

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  )
}
