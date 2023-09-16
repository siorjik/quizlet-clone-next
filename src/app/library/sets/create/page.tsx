'use client'

import BreadCrumbs from '@/components/Breadcrumbs'

import { libraryAppPath, setsAppPath } from '@/app/utils/paths'
import SetForm from '@/components/Form/SetForm'

export default function Create() {
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
      <SetForm action='create' />
    </>
  )
}
