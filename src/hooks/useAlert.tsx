"use clinet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

type AlertItem = {
  title: string
  description: string
  onResolve(value: boolean): void
}
const useAlert = (): [() => JSX.Element, (item: AlertItem) => void] => {
  const [state, setState] = useState<AlertItem | null>(null)

  const AlertProvider = () => (
    <AlertDialog open={state !== null}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{state?.title}</AlertDialogTitle>
          <AlertDialogDescription>{state?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              state?.onResolve(false)
              setState(null)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              state?.onResolve(true)
              setState(null)
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return [AlertProvider, setState]
}

export default useAlert
