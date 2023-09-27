'use client'

import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { mutate } from 'swr'

import SetForm from '@/components/Form/SetForm'
import Spinner from '@/components/Spinner'

import { getSetPath, setApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useRequest from '@/hooks/useRequest'
import apiService from '@/services/apiService'

export default function Edit({ params }: { params: { id: string } }) {
  const { data: set, isLoading, error } =
    useRequest<SetType>({ key: `set/${params.id}/edit`, url: `${setApiPath}?id=${params.id}` })

  const { push } = useRouter()

  const update = async (data: SetType): Promise<void> => {
    try {
      await apiService({ url: setApiPath, method: 'put', body: data })
  
      mutate(`set/${params.id}`, data)
      mutate(`set/${params.id}/edit`, data)
  
      push(getSetPath(data.id as string))
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <>
      <Link
        className='mb-8 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
        href={getSetPath(params.id)}
      >Cancel</Link>
      <SetForm data={set} action='edit' func={update} />
    </>
  )
}
