'use client'

import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { MutatorOptions } from 'swr'
import { useCallback } from 'react'

import SetForm from '@/components/Form/SetForm'
import Spinner from '@/components/Spinner'

import { getSetAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import apiService from '@/services/apiService'
import useSmartRequest from '@/hooks/useSmartRequest'
import useSetContext from '@/contexts/SetContext'

export default function Edit({ params }: { params: { id: string } }) {
  const { data, isLoading, error, mutate, mutateData } = useSmartRequest<SetType>({
    key: `set/${params.id}`, url: `${getSetApiPath()}?id=${params.id}`, requiredProp: 'data', entity: 'set'
  })

  const { list } = useSetContext()
  const { push } = useRouter()

  const update = useCallback(async (body: SetType): Promise<void> => {
    try {
      await apiService<SetType>({ url: getSetApiPath(), method: 'PATCH', body })

      const filtered = list.filter(item => item._id !== body._id)

      mutateData(`sets`, { list: [body, ...filtered], data: body }, [body, ...filtered])
      mutate(`set/${params.id}`, body as MutatorOptions)

      push(getSetAppPath(body._id as string))
    } catch (error) {
      console.log(error)
    }
  }, [params.id])

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-7xl'>
        <Link
          className='mb-8 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
          href={getSetAppPath(params.id)}
        >Cancel</Link>
        <SetForm data={data} action='edit' func={update} />
      </div>
    </div>
  )
}
