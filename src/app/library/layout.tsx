import type { Metadata } from 'next'

import Layout from '@/components/Layout'

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library page',
}

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}
