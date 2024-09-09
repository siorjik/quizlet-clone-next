import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Password',
  description: 'Password creating page',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
