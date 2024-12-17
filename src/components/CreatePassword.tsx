'use client'

import { toast } from 'react-toastify'
import Link from 'next/link'
import { useAction } from 'next-safe-action/hooks'
import { z } from 'zod'

import ToastMessage from '@/components/ToastMessage'
import Form from '@/components/Form/FormWithZod'

import { loginAppPath } from '@/utils/paths'
import { createPassFormTypeSchema } from '@/types/forms/auth'
import { createPassword } from '@/actions/auth/mutations'

export default function CreatePassword({ token }: { token: string }) {
  const { execute, hasErrored } = useAction(createPassword, {
    onSuccess: () => {
      toast(
        'Password was created! Let`s login!',
        { position: 'bottom-center', type: 'success' }
      )
    },
    
    onError: ({ error }) => {
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
      blockStyle: 'w-full',
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
        data={{ password: '', confirmPassword: '' }}
        isErr={hasErrored}
        showSpinner
      />
      <p className='mt-10'>
        Go to <Link className='link' href={loginAppPath}>Sign In</Link>
      </p>
      <ToastMessage />
    </>
  )
}
