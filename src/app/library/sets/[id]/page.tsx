import BreadCrumbs from '@/components/Breadcrumbs'

import SetForm from '@/components/Form/SetForm'

import { getEditSetPath, libraryAppPath, setApiPath, setsAppPath } from '@/app/utils/paths'
import { SetType } from '@/types/SetTypes'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const getSet = async (id: string) => {
  const res = await fetch(`${process.env.APP_HOST}${setApiPath}?id=${id}`, { cache: 'no-store' })

  if (!res.ok) redirect('/404')
  else return res.json()
}

export default async function Set ({ params }: { params: { id: string } }) {
  const set: SetType = await getSet(params.id)

  const breadCrumbsData: { title: string, path: string }[] = [
    {
      title: 'my library',
      path: libraryAppPath
    },
    {
      title: 'sets',
      path: setsAppPath
    }
  ]

  return (
    <>
      <BreadCrumbs data={breadCrumbsData} />
      <Link
        className='mb-8 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
        href={getEditSetPath(params.id)}
      >Edit</Link>
      <SetForm data={set} />
    </>
  )
}
