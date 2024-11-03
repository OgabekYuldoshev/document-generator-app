import React from "react"
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

const NewDocumentButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hi</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia qui
            cum ex! Reiciendis itaque illo, sed eos beatae necessitatibus porro
            debitis, vitae non impedit quos, mollitia eligendi quis unde.
            Debitis!
          </DialogDescription>
        </DialogHeader>
        <div>Salom</div>
      </DialogContent>
    </Dialog>
  )
}

export default NewDocumentButton
