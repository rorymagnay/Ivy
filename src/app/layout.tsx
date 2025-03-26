import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "@/components/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IVY - College Application Assistant",
  description: "Track university applications and get AI assistance with essays",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  )
} 