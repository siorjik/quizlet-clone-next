'use client'

import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'react-toastify'

import Form from '@/components/Form/FormWithZod'

import { changePassFormTypeSchema } from '@/types/forms/auth'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import Spinner from '@/components/Spinner'

export default function ChangePassForm() {
  const [isLoading, setLoading] = useState(false)

  const submit = async (data: z.infer<typeof changePassFormTypeSchema>) => {
    setLoading(true)

    try {
      await apiService({ url: '/api/users/change-password', method: 'PATCH', body: data })

      toast('Password was updated', { position: 'bottom-center', type: 'success' })

      setLoading(false)
    } catch (error) {
      const err = error as ApiErrType

      toast(err.message, { position: 'bottom-center', type: 'error' })

      setLoading(false)

      throw new Error()
    }
  }

  const fieldsData = [
    {
      name: 'currentPass',
      type: 'password',
      label: 'Current password',
      inputStyle: 'input',
      blockStyle: 'w-full',
      isRequired: true,
    },
    {
      name: 'newPass',
      type: 'password',
      label: 'New password',
      inputStyle: 'input',
      blockStyle: 'w-full mt-8',
      isRequired: true,
    },
  ]

  return (
    <>
      <h3 className='mb-8'>Password updating:</h3>
      <Form
        submit={submit}
        fieldsData={fieldsData}
        css='md:w-1/2 md:max-w-[500px]'
        btnData={{ text: 'Change password' }}
        schema={changePassFormTypeSchema}
        data={{ currentPass: '', newPass: '' }}
        isReset
      />
      {isLoading && <Spinner />}
    </>
  )
}
