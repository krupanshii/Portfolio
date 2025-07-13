import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Krupanshi Patel - Aspiring Data Scientist",
  description:
    "Passionate data scientist turning data into decisions. Explore my projects in AI, machine learning, and data analytics.",
  keywords: "data science, machine learning, AI, python, analytics, portfolio",
  authors: [{ name: "Krupanshi Patel" }],
  openGraph: {
    title: "Krupanshi Patel - Asipring Data Scientist",
    description: "Passionate data scientist turning data into decisions",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
