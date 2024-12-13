import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import RootContextProvider from '@/contexts/RootContext'

const inter = Inter({ subsets: ['greek'] })

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}><RootContextProvider>{children}</RootContextProvider></body>
    </html>
  )
}
