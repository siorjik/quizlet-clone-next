'use client'

import { useSWRConfig } from 'swr'

import SetForm from '@/components/Form/SetForm'

import { getSetApiPath, setsAppPath } from '@/utils/paths'
import apiService from '@/services/apiService'
import { SetType } from '@/types/SetTypes'
import useSetContext from '@/contexts/SetContext'

export default function SetCreatingForm() {
  const { list, setContext } = useSetContext()
  const { mutate } = useSWRConfig()

  const create = async (body: SetType): Promise<void> => {
    try {
      const newSet = await apiService<SetType>({ url: getSetApiPath(), method: 'POST', body })

      setContext({ list: [newSet, ...list] })
      mutate('sets', [newSet, ...list])

      window.location.href = setsAppPath
    } catch (error) {
      console.log(error)
    }
  }

  return <SetForm func={create} action='create' />
}
