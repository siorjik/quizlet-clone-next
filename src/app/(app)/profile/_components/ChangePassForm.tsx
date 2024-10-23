'use client'

import { z } from 'zod'
import { toast } from 'react-toastify'

import Form from '@/components/Form/FormWithZod'

import { changePassFormTypeSchema } from '@/types/forms/auth'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'

export default function ChangePassForm() {
  const submit = async (data: z.infer<typeof changePassFormTypeSchema>) => {
    try {
      await apiService({ url: '/api/users/change-password', method: 'PATCH', body: data })

      toast('Password was updated', { position: 'bottom-center', type: 'success' })
    } catch (error) {
      const err = error as ApiErrType

      toast(err.message, { position: 'bottom-center', type: 'error' })

      throw new Error()
    }
  }

  const fieldsData = [
    {
      name: 'currentPass',
      type: 'password',
      label: 'Current password',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
    },
    {
      name: 'newPass',
      type: 'password',
      label: 'New password',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
    },
  ]

  return (
    <>
      <Form
        submit={submit}
        fieldsData={fieldsData}
        css='md:w-1/2 md:max-w-[500px]'
        btnData={{ text: 'Change password' }}
        schema={changePassFormTypeSchema}
        isReset
      />
    </>
  )
}
