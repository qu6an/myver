import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "АВТОКОМ — Управление автосервисом с геймификацией и проектами EVERYCAR",
  description:
    "Платформа управления автосервисом с геймификацией, аналитикой и участием в проектах EVERYCAR. Снижайте издержки и повышайте вовлечённость команды.",
  keywords: "автосервис, автоком, everycar, геймификация, управление сто, аналитика автосервиса",
  openGraph: {
    title: "АВТОКОМ — Управление автосервисом",
    description: "Платформа управления автосервисом с геймификацией и аналитикой",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          as="style"
        />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
