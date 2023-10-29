'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetList from './components/SetList'
import Spinner from '@/components/Spinner'

import { createSetAppPath, libraryAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useRequest from '@/hooks/useRequest'
import useSetContext from '@/contexts/SetContext'

export default function Sets() {
  const { data: resp, isLoading, error } =
    useRequest<SetType[]>({ key: 'sets', url: `${getSetApiPath()}?userId=${'652fe4bb1e70cb4f997e1174'}` })

  const { data, setSet } = useSetContext()

  useEffect(() => {
    setSet({ data: { ...data }, list: resp })
  }, [resp])

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <>
      <BreadCrumbs data={[{ title: 'my library', path: libraryAppPath }]} />
      <Link className='mb-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all' href={createSetAppPath}
      >Create</Link>
      <SetList data={resp || []} />
    </>
  )
}
