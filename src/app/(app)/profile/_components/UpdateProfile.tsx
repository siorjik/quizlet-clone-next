'use client'

import Tabs from 'rc-tabs'

import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

import InfoForm from './InfoForm'
import ChangePassForm from './ChangePassForm'
import ChangeImage from './ChangeImage'

export default function UpdateProfile() {
  const { data: session } = useSession()
  const sessionData = session as Session & { isAuthProvider: boolean }

  const tabs = [
    {
      key: '1',
      label: 'General',
      tab: 'General',
      children: <InfoForm />
    },
    {
      key: '2',
      label: 'Password',
      tab: 'Password',
      children: <ChangePassForm />
    },
    {
      key: '3',
      label: 'Image',
      tab: 'Image',
      children: <ChangeImage />
    }
  ]

  const tabsData = tabs.filter(tab => sessionData.isAuthProvider ? tab.key !== '3' : tabs)

  return (
    <>
      <Tabs items={tabsData} defaultActiveKey='1' destroyInactiveTabPane={true} />
    </>
  )
}
