'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { toast } from 'react-toastify'

import Form from '@/components/Form/FormWithZod'
import Button from '@/components/Button'

import { registerFormTypeSchema } from '@/types/forms/auth'
import apiService from '@/services/apiService'

export default function InfoForm() {
  const [isEditing, setEditing] = useState(false)

  const { data: session, update } = useSession()

  const submit = async (data: z.infer<typeof registerFormTypeSchema>): Promise<void> => {
    try {
      await apiService({ url: '/api/users', method: 'PATCH', body: data })

      toast('User was updated', { position: 'bottom-center', type: 'success' })

      update({ ...data })

      setEditing(false)
    } catch (error) {
      console.log(error)

      toast('Something went wrong', { position: 'bottom-center', type: 'error' })
    }
  }

  const fieldsData = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
    },
  ]

  return (
    <>
      <Button css='mb-10' click={() => setEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</Button>
      <Form
        fieldsData={fieldsData}
        submit={submit}
        css='md:w-1/2 md:max-w-[500px]'
        schema={registerFormTypeSchema}
        btnData={{ text: 'Save' }}
        isDisabled={!isEditing}
        data={session?.user}
      />
    </>
  )
}
