import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library | Sets',
  description: 'Sets page',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}