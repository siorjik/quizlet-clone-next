import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}