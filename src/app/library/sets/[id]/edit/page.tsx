import Link from 'next/link'
import { redirect } from 'next/navigation'

import SetForm from '@/components/Form/SetForm'

import { getSetPath, setApiPath } from '@/app/utils/paths'
import { SetType } from '@/types/SetTypes'

const getSet = async (id: string): Promise<SetType> => {
  const res = await fetch(`${process.env.APP_HOST}${setApiPath}?id=${id}`, { cache: 'no-store' })

  if (!res.ok) redirect('/404')
  else return res.json()
}

export default async function Edit ({ params }: { params: { id: string } }) {
  const set: SetType = await getSet(params.id)

  return (
    <>
      <Link
        className='mb-8 inline-block border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all'
        href={getSetPath(params.id)}
      >Cancel</Link>
      <SetForm data={set} action='edit' />
    </>
  )
}
