'use client'

import { useRouter } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'

import { libraryAppPath, getSetApiPath, setsAppPath } from '@/utils/paths'
import SetForm from '@/components/Form/SetForm'
import apiService from '@/services/apiService'
import { SetType } from '@/types/SetTypes'

export default function Create() {
  const { push } = useRouter()

  const create = async (body: SetType): Promise<void> => {
    try {
      await apiService<SetType>({ url: getSetApiPath(), method: 'POST', body: { ...body, userId: '652fe4bb1e70cb4f997e1174' } })
  
      push(setsAppPath)
    } catch (error) {
      console.log(error)
    }
  }

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
      <SetForm func={create} action='create' />
    </>
  )
}
