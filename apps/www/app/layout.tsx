import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

export const metadata: Metadata = {
  title: "lapse",
  description: "High-quality image hosting for individuals.",
};
