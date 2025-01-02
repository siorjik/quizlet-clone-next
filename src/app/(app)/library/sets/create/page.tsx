import BreadCrumbs from '@/components/Breadcrumbs'
import SetCreatingForm from './_components/SetCreatingForm'

import { setsAppPath } from '@/utils/paths'

export default function Create() {
  const breadCrumbsData: { title: string, path: string }[] = [{ title: 'sets', path: setsAppPath }]

  return (
    <>
      <BreadCrumbs data={breadCrumbsData} />
      <SetCreatingForm />
    </>
  )
}
