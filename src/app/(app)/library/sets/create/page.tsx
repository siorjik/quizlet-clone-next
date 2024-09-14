import BreadCrumbs from '@/components/Breadcrumbs'
import SetCreatingForm from './_components/SetCreatingForm'

import { setsAppPath } from '@/utils/paths'

export default function Create () {
  const breadCrumbsData: { title: string, path: string }[] = [{ title: 'sets', path: setsAppPath }]

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full'>
        <BreadCrumbs data={breadCrumbsData} />
        <SetCreatingForm />
      </div>
    </div>
  )
}
