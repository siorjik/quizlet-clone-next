'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import BreadCrumbs from '@/components/Breadcrumbs'
import SetForm from '@/components/Form/SetForm'
import Spinner from '@/components/Spinner'

import { getEditSetAppPath, getSetApiPath, setsAppPath, getSetFlashCardsAppPath } from '@/utils/paths'
import { SetType } from '@/types/SetTypes'
import useSmartRequest from '@/hooks/useSmartRequest'

export default function Set({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useSmartRequest<SetType>({
    key: `set/${params.id}`, url: `${getSetApiPath()}?id=${params.id}`, requiredProp: 'data', entity: 'set'
  })

  const breadCrumbsData: { title: string, path: string }[] = [{ title: 'sets', path: setsAppPath }]

  const linkStyle = 'mr-5 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'

  if (isLoading) return <Spinner />
  else if (error) return notFound()

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <BreadCrumbs data={breadCrumbsData} />
        <div className='mb-8'>
          <Link
            className={linkStyle}
            href={getEditSetAppPath(params.id)}
          >Edit</Link>
          <Link
            className={linkStyle}
            href={getSetFlashCardsAppPath(params.id)}
          >Flashcards</Link>
        </div>
        <SetForm data={data} />
      </div>
    </div>
  )
}
