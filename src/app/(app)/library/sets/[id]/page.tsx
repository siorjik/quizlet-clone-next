import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetForm from '@/components/Form/SetForm'

import { getEditSetAppPath, getSetApiPath, setsAppPath, getSetFlashCardsAppPath, loginAppPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import { ApiErrType } from '@/types/ErrorTypes'
import apiService from '@/services/apiService'

async function getSet(id: string): Promise<SetType | { error: ApiErrType }> {
  try {
    return await apiService<SetType>({ url: `${getSetApiPath()}?id=${id}`, headers: headers() })
  } catch (err) {
    const error = err as ApiErrType

    return { error }
  }
}

export default async function Set({ params }: { params: { id: string } }) {
  const set = await getSet(params.id)

  const breadCrumbsData: { title: string, path: string }[] = [{ title: 'sets', path: setsAppPath }]

  const linkStyle = 'mr-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'

  if ('error' in set) {
    if (set.error.statusCode !== 401) notFound()
    else redirect(loginAppPath)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className='mb-8'>
          <Link className={linkStyle} href={getEditSetAppPath(params.id)}>Edit</Link>
          <Link className={linkStyle} href={getSetFlashCardsAppPath(params.id)}>Flashcards</Link>
        </div>
        <SetForm data={set} />
      </div>
    </div>
  )
}
