'use client'

import { useRouter } from 'next/navigation'
import { useSWRConfig } from 'swr'

import BreadCrumbs from '@/components/Breadcrumbs'

import { getSetApiPath, setsAppPath } from '@/utils/paths'
import SetForm from '@/components/Form/SetForm'
import apiService from '@/services/apiService'
import { SetType } from '@/types/SetTypes'
import useSetContext from '@/contexts/SetContext'

export default function Create() {
  const { list, setContext } = useSetContext()
  const { push } = useRouter()
  const { mutate } = useSWRConfig()

  const create = async (body: SetType): Promise<void> => {
    try {
      const newSet = await apiService<SetType>({ url: getSetApiPath(), method: 'POST', body })

      setContext({ list: [newSet, ...list] })
      mutate('sets', [newSet, ...list])

      push(setsAppPath)
    } catch (error) {
      console.log(error)
    }
  }

  const breadCrumbsData: { title: string, path: string }[] = [{ title: 'sets', path: setsAppPath }]

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <BreadCrumbs data={breadCrumbsData} />
        <SetForm func={create} action='create' />
      </div>
    </div>
  )
}
