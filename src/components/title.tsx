import { cn } from "@/lib/utils"
import React from "react"

interface Props {
  title: string
  description?: string
  className?: string
}

export const Title = ({ title, description = "", className = "" }: Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <h1 className="text-xl font-bold">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
