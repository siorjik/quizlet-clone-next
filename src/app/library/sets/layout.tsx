import type { Metadata } from 'next'

import { SetContextProvider } from '@/contexts/SetContext'

export const metadata: Metadata = {
  title: 'Library | Sets',
  description: 'Sets page',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <SetContextProvider>{children}</SetContextProvider>
}