'use client'

import { useRouter } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'

import { libraryAppPath, setApiPath, setsAppPath } from '@/utils/paths'
import SetForm from '@/components/Form/SetForm'
import apiService from '@/services/apiService'
import { SetType } from '@/types/SetTypes'

export default function Create() {
  const { push } = useRouter()

  const create = async (data: SetType): Promise<void> => {
    try {
      await apiService({ url: setApiPath, method: 'post', body: data })
  
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
