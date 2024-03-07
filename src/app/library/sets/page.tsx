import Link from 'next/link'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

import SetList from './components/SetList'

import { createSetAppPath, getSetApiPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'

export const dynamic = 'force-dynamic'

async function getSets(): Promise<SetType[] | ApiErrType> {
  try {
    return await apiService<SetType[]>({ url: getSetApiPath(), headers: headers() })
  } catch (err) {
    const error = err as ApiErrType

    return error
  }
}

export default async function Sets() {
  const sets: SetType[] | ApiErrType = await getSets()

  if ('error' in sets) notFound()

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-5xl'>
        <Link className='mb-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
          href={createSetAppPath}
        >Create</Link>
        <SetList data={sets} />
      </div>
    </div>
  )
}
