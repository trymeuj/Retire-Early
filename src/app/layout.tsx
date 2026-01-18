import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Explore Early Retirement',
  description: 'An interactive tool to explore what early retirement could look like for you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

