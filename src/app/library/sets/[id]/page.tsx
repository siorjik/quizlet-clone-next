'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetForm from '@/components/Form/SetForm'
import Spinner from '@/components/Spinner'

import { getEditSetPath, libraryAppPath, setApiPath, setsAppPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useRequest from '@/hooks/useRequest'

export default function Set ({ params }: { params: { id: string } }) {
  const { data: set, isLoading, error } = useRequest<SetType>({ key: `set/${params.id}`, url: `${setApiPath}?id=${params.id}` })

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

  if (isLoading) return <Spinner />
  else if (error) return notFound()

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
