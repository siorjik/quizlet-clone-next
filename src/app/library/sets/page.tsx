'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetList from './components/SetList'
import Spinner from '@/components/Spinner'

import { createSetAppPath, libraryAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useSmartRequest from '@/hooks/useSmartRequest'
import apiService from '@/services/apiService'

export default function Sets() {
  const { list = [], isLoading, error, mutateData } = useSmartRequest<SetType>({
    key: 'sets', url: getSetApiPath(), requiredProp: 'list', entity: 'set'
  })

  const remove = useCallback(async (id: string): Promise<void> => {
    await apiService({ url: `${getSetApiPath()}?id=${id}`, method: 'DELETE' })

    const res = list.filter(item => item._id !== id)

    mutateData('sets', { list: res }, res)
  }, [list])

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-5xl'>
        <BreadCrumbs data={[{ title: 'my library', path: libraryAppPath }]} />
        <Link className='mb-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
          href={createSetAppPath}
        >Create</Link>
        <SetList data={list} remove={async (id: string) => await remove(id)} />
      </div>
    </div>
  )
}
