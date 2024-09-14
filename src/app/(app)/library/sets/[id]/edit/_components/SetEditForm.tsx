'use client'

import { useCallback } from 'react'

import SetForm from '@/components/Form/SetForm'

import { getSetAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import apiService from '@/services/apiService'
import useSetContext from '@/contexts/SetContext'

export default function SetEditForm({ id, data }: { id: string, data: SetType }) {
  const { list, setContext } = useSetContext()

  const update = useCallback(async (body: SetType): Promise<void> => {
    try {
      await apiService<SetType>({ url: getSetApiPath(), method: 'PATCH', body })

      const filtered = list.filter(item => item._id !== body._id)

      setContext({ list: [body, ...filtered], data: body })

      window.location.href = getSetAppPath(body._id as string)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  return <SetForm data={data} action='edit' func={update} />
}
