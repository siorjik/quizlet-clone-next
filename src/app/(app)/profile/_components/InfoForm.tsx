'use client'

import { useSession } from 'next-auth/react'
import { z } from 'zod'

import Form from '@/components/Form/FormWithZod'

import { registerFormTypeSchema } from '@/types/forms/auth'
import apiService from '@/services/apiService'
import { toast } from 'react-toastify'

export default function InfoForm({ isDisabled, onSuccess }: { isDisabled: boolean, onSuccess: () => void }) {
  const { data: session, update } = useSession()

  const submit = async (data: z.infer<typeof registerFormTypeSchema>): Promise<void> => {
    try {
      const res = await apiService({ url: '/api/users', method: 'PATCH', body: data })

      toast('User was updated', { position: 'bottom-center', type: 'success' })

      update({ ...data })

      onSuccess()
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
      {session?.user && <Form
        fieldsData={fieldsData}
        submit={submit}
        css='md:w-1/2 md:max-w-[500px]'
        schema={registerFormTypeSchema}
        btnData={{ text: 'Save' }}
        isDisabled={isDisabled}
        data={session?.user}
      />}
    </>
  )
}
