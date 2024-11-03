"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { SquarePen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

const NewDocumentButton = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button onClick={() => setOpen(true)} size="icon" variant="secondary">
            <SquarePen />
          </Button>
        </TooltipTrigger>
        <TooltipContent>New Document</TooltipContent>
      </Tooltip>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hi</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              qui cum ex! Reiciendis itaque illo, sed eos beatae necessitatibus
              porro debitis, vitae non impedit quos, mollitia eligendi quis
              unde. Debitis!
            </DialogDescription>
          </DialogHeader>
          <div>Salom</div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default NewDocumentButton
