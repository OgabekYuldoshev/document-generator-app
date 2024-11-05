import "@/lib/db"

import "./globals.css"

import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond } from "next/font/google"
import NextTopLoader  from "nextjs-toploader"

import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Document Generator App",
  description: "Generate document and generate your document!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, eb_garamond.variable, "antialiased dark")}
      >
      <NextTopLoader/>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
