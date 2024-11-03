"use client"

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { HTTPException } from "hono/http-exception"
import { type PropsWithChildren, useState } from "react"
import { Toaster } from "./ui/sonner"
import NextNProgress from "nextjs-progressbar"
export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            let errorMessage: string
            if (err instanceof HTTPException) {
              errorMessage = err.message
            } else if (err instanceof Error) {
              errorMessage = err.message
            } else {
              errorMessage = "An unknown error occurred."
            }
            console.log(errorMessage)
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {children}
      <Toaster richColors />
    </QueryClientProvider>
  )
}
