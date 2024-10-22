'use client'

import { useState } from 'react'
import Tabs from 'rc-tabs'

import InfoForm from './InfoForm'
import Button from '@/components/Button'
import ChangePassForm from './ChangePassForm'

export default function UpdateProfile() {
  const [isEditing, setEditing] = useState(false)

  const handleChange = () => {
    if (isEditing) setEditing(false)
  }

  const tabs = [
    {
      key: '1',
      label: 'General',
      tab: 'General',
      children: (
        <>
          <Button css='mb-10' click={() => setEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</Button>
          <InfoForm isDisabled={!isEditing} onSuccess={handleChange} />       
        </>
      )
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
      <Tabs items={tabs} defaultActiveKey='1' destroyInactiveTabPane={true} onChange={handleChange} />
    </>
  )
}
