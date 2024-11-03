import React from "react"
import { Button } from "./ui/button"
import { PanelRightOpen } from "lucide-react"
import { useGlobalState } from "@/hooks/useGlobalState"

const CollapsedButton = () => {
  const { isCollapsed, setCollapsed } = useGlobalState()
  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => setCollapsed(!isCollapsed)}
    >
      <PanelRightOpen />
    </Button>
  )
}

export default CollapsedButton
