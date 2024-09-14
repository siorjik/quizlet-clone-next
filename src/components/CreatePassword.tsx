'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'

import Spinner from '@/components/Spinner'
import ToastMessage from '@/components/ToastMessage'
import Form from '@/components/Form/FormWithZod'

import { loginAppPath } from '@/utils/paths'
import { createPassFormTypeSchema } from '@/types/forms/auth'
import { createPassword } from '@/actions/auth/mutations'

export default function CreatePassword({ token }: { token: string }) {
  const [isLoading, setLoading] = useState(false)

  const { execute, isExecuting } = useAction(createPassword, {
    onSuccess: () => {
      setLoading(false)

      toast(
        'Password was created! Let`s login!',
        { position: 'bottom-center', type: 'success' }
      )
    },
    onError: ({ error }) => {
      setLoading(false)

      toast(error.serverError, { position: 'bottom-left', type: 'error' })
    }
  })

  const submit = async (data: z.infer<typeof createPassFormTypeSchema>): Promise<void> => {
    const { password } = data

    if (!token) {
      toast('Invalid token!', { position: 'bottom-left', type: 'error' })

      return
    } else execute({ password, token })
  }

  const fieldsData = [
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
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
        css='w-4/5 md:w-1/2 max-w-sm flex flex-col items-center'
        btnData={{ text: 'Create Password' }}
        schema={createPassFormTypeSchema}
        isReset
      />
      <p className='mt-10'>
        Go to <Link className='link' href={loginAppPath}>Sign In</Link>
      </p>
      <ToastMessage />
      {isLoading || isExecuting && <Spinner />}
    </>
  )
}
