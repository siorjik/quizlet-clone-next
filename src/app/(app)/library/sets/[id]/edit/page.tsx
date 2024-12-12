import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { getSetAppPath, getSetApiPath, loginAppPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import SetEditForm from './_components/SetEditForm'

async function getSet(id: string): Promise<SetType | { error: ApiErrType }> {
  try {
    return await apiService<SetType>({ url: `${getSetApiPath()}?id=${id}`, headers: headers() })
  } catch (err) {
    const error = err as ApiErrType

    return { error }
  }
}
export default async function Edit({ params }: { params: { id: string } }) {
  const set = await getSet(params.id)

  if ('error' in set) {
    if (set.error.statusCode !== 401) notFound()
    else redirect(loginAppPath)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <Link
          className='mb-8 btn-lg inline-block'
          href={getSetAppPath(params.id)}
        >Cancel</Link>
        <SetEditForm id={params.id} data={set} />
      </div>
    </div>
  )
}
