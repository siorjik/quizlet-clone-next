import Link from 'next/link'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetList from './components/SetList'

import { createSetAppPath, libraryAppPath, setApiPath } from '@/app/utils/paths'
import { SetType } from '@/types/SetTypes'
import { redirect } from 'next/navigation'

const getSets = async (): Promise<SetType[]> => {
  const res = await fetch(`${process.env.APP_HOST}${setApiPath}`, { cache: 'no-store' })

  if (!res.ok) redirect('/404')
  else return res.json()
}

export default async function Sets() {
  const sets: SetType[] = await getSets()

  return (
    <>
      <BreadCrumbs data={[{ title: 'my library', path: libraryAppPath }]} />
      <Link className='mb-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all' href={createSetAppPath}
      >Create</Link>
      <SetList data={sets} />
    </>
  )
}
