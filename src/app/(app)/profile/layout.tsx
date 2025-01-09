import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile page',
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
