'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetList from './components/SetList'
import Spinner from '@/components/Spinner'

import { createSetAppPath, libraryAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useSetContext from '@/contexts/SetContext'
import useSmartRequest from '@/hooks/useSmartRequest'
import apiService from '@/services/apiService'

export default function Sets() {

  const { list: contextList, data, setContext } = useSetContext()

  const { list, isLoading, error } = useSmartRequest<SetType[]>({
    key: 'sets', url: `${getSetApiPath()}?userId=${'652fe4bb1e70cb4f997e1174'}`, requiredProp: 'list', entity: 'set'
  })

  const remove = async(id: string): Promise<void> => {
    await apiService({ url: `${getSetApiPath()}?id=${id}`, method: 'DELETE' })

    const list = contextList.filter(item => item._id !== id)
    setContext({ data, list })
  }

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <>
      <BreadCrumbs data={[{ title: 'my library', path: libraryAppPath }]} />
      <Link className='mb-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all' href={createSetAppPath}
      >Create</Link>
      <SetList data={list || []} remove={async (id: string) => await remove(id)} />
    </>
  )
}
