import React from "react"
import { Button } from "./ui/button"
import { PanelRightOpen } from "lucide-react"
import { useGlobalState } from "@/hooks/useGlobalState"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

const CollapsedButton = () => {
  const { isCollapsed, setCollapsed } = useGlobalState()
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setCollapsed(!isCollapsed)}
        >
          <PanelRightOpen />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Close sidebar</TooltipContent>
    </Tooltip>
  )
}

export default CollapsedButton
