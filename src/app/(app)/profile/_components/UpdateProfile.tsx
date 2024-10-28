'use client'

import Tabs from 'rc-tabs'

import InfoForm from './InfoForm'
import ChangePassForm from './ChangePassForm'
import ChangeImage from './ChangeImage'

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
    },
    {
      key: '3',
      label: 'Image',
      tab: 'Image',
      children: <ChangeImage />
    }
  ]

  return (
    <>
      <Tabs items={tabs} defaultActiveKey='1' destroyInactiveTabPane={true} />
    </>
  )
}
