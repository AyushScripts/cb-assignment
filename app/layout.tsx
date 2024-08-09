import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { title } from "process"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata= {
  title: 'CB Assignment'
}

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
    
  )
}
