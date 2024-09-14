import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { SetType } from '@/types/SetTypes'
import { getSetApiPath, getSetAppPath, loginAppPath, setsAppPath } from '@/utils/paths'
import Slider from './_components/Slider'

async function getSet(id: string): Promise<SetType | { error: ApiErrType }> {
  try {
    return await apiService<SetType>({ url: `${getSetApiPath()}?id=${id}`, headers: headers() })
  } catch (err) {
    const error = err as ApiErrType

    return { error }
  }
}

export default async function FlashCards({ params }: { params: { id: string } }) {
  const set = await getSet(params.id)

  if ('error' in set) {
    if (set.error.statusCode !== 401) notFound()
    else redirect(loginAppPath)
  }

  const breadCrumbsData: { title: string, path: string }[] = [
    {
      title: 'sets',
      path: setsAppPath
    },
    {
      title: 'set',
      path: getSetAppPath(params.id)
    }
  ]

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <BreadCrumbs data={breadCrumbsData} />
        <h2 className='page-title'>{set.title}</h2>
        <Slider data={set} />
      </div>
    </div>
  )
}
