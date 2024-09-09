import { getServerSession } from 'next-auth'

import Layout from '@/components/Layout'
import Auth from './_components/Auth'

export default async function Home () {
  const session = await getServerSession()

  return (
    <>
      <Layout>
        {session?.user ? <h2>Home</h2> : <Auth />}
      </Layout>
    </>
  )
}
