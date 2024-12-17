'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { z } from 'zod'
import { toast } from 'react-toastify'

import Form from '@/components/Form/FormWithZod'

import { registerFormTypeSchema } from '@/types/forms/auth'
import apiService from '@/services/apiService'
import Spinner from '@/components/Spinner'

export default function InfoForm() {
  const { data: session, update } = useSession()
  const [isLoading, setLoading] = useState(false)

  const submit = async (data: z.infer<typeof registerFormTypeSchema>): Promise<void> => {
    setLoading(true)

    try {
      await apiService({ url: '/api/users', method: 'PATCH', body: data })

      toast('User was updated', { position: 'bottom-center', type: 'success' })

      update({ ...data })

      setLoading(false)
    } catch (error) {
      console.log(error)

      toast('Something went wrong', { position: 'bottom-center', type: 'error' })

      setLoading(false)
    }
  }

  const fieldsData = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      inputStyle: 'input',
      blockStyle: 'w-full',
      isRequired: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      inputStyle: 'input',
      blockStyle: 'w-full mt-8',
      isRequired: true,
    },
  ]

  return (
    <>
      <h3 className='mb-8'>Data updating:</h3>
      <Form
        fieldsData={fieldsData}
        submit={submit}
        css='md:w-1/2 md:max-w-[500px]'
        schema={registerFormTypeSchema}
        btnData={{ text: 'Save' }}
        data={session?.user}
      />
      {isLoading && <Spinner />}
    </>
  )
}
