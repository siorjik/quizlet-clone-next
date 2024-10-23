'use client'

import Tabs from 'rc-tabs'

import InfoForm from './InfoForm'
import ChangePassForm from './ChangePassForm'

export default function UpdateProfile() {
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
    }
  ]

  return (
    <>
      <Tabs items={tabs} defaultActiveKey='1' destroyInactiveTabPane={true} />
    </>
  )
}
