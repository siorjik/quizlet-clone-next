'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'

import Spinner from '@/components/Spinner'
import ToastMessage from '@/components/ToastMessage'

import AuthProviderBlock from '@/components/AuthProvidersBlock'
import Form from '@/components/Form/FormWithZod'
import { createUser } from '@/actions/auth/mutations'
import { registerFormTypeSchema } from '@/types/forms/auth'

export default function CreateAccForm() {
  const [isLoading, setLoading] = useState(false)

  const { execute } = useAction(createUser, {
    onSuccess: ({ data }) => {
      setLoading(false)

      toast(
        'User was created. Check email to create a password and finish registration.',
        { position: 'bottom-center', type: 'success' }
      )
    },
    onError: ({ error }) => {
      setLoading(false)

      toast(error.serverError, { position: 'bottom-left', type: 'error' })
    }
  })

  const submit = async (data: z.infer<typeof registerFormTypeSchema>): Promise<void> => {
    setLoading(true)

    execute({ email: data.email, name: data.name })
  }
  const submitViaProvider = async (name: string): Promise<void> => {
    setLoading(true)

    await signIn(name, { callbackUrl: '/' })

    setLoading(false)
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
      <Form
        submit={submit}
        fieldsData={fieldsData}
        css='w-full flex flex-col items-center'
        btnData={{ text: 'Create Account' }}
        schema={registerFormTypeSchema}
        isReset
      />
      <AuthProviderBlock submit={submitViaProvider} />
      <ToastMessage />
      {isLoading && <Spinner />}
    </>
  )
}
