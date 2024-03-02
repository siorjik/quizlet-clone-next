import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Account creating page',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
