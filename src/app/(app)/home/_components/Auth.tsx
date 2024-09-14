'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import z from 'zod'

import Modal from '@/components/Modal'
import Form from '@/components/Form/FormWithZod'
import Spinner from '@/components/Spinner'
import AuthProviderBlock from '@/components/AuthProvidersBlock'

import { loginFormTypeSchema, registerFormTypeSchema } from '@/types/forms/auth'
import { createUser } from '@/actions/auth/mutations'

export default function Auth() {
  const [isShow, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { execute } = useAction(createUser, {
    onSuccess: ({ data }) => {
      toast(
        'User was created. Check email to create a password and finish registration.',
        { position: 'bottom-center', type: 'success' }
      )

      setShow(false)
    },
    onError: ({ error }) => {
      toast(error.serverError, { position: 'bottom-left', type: 'error' })
    }
  })

  const submit = async (
    data: { email: string, password?: string, name?: string }, action: 'signIn' | 'signOn'
  ): Promise<void> => {
    const isSignOn = action === 'signOn'

    setLoading(true)

    if (isSignOn) execute({ email: data.email, name: data.name! })
    else {
      const res = await signIn('credentials', { redirect: false, ...data })

      if (res?.error) toast(res.error, { position: 'bottom-left', type: 'error' })
      else {
        setTimeout(() => window.location.reload(), 1000)

        setShow(false)
      }
    }

    setLoading(false)
  }

  const submitViaProvider = async (name: string): Promise<void> => {
    setLoading(true)

    await signIn(name, { callbackUrl: '/' })

    setLoading(false)
    setShow(false)
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
      name: 'password',
      label: 'Password',
      type: 'password',
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

  const modalContent = (
    <>
      <div className='flex flex-col md:flex-row'>
        <div>
          <h3 className='mb-5 text-center'>Sign In</h3>
          <Form
            submit={
              async (data: { [key: string]: string }) => await submit(data as z.infer<typeof loginFormTypeSchema>, 'signIn')
            }
            fieldsData={[fieldsData[0], fieldsData[1]]}
            css='w-64 flex flex-col items-center'
            btnData={{ text: 'Login', hoverColor: 'hover:bg-violet-300' }}
            schema={loginFormTypeSchema}
          />
        </div>
        <div className='h-[1px] md:h-44 w-full md:w-[1px] my-5 md:my-auto md:mx-5 bg-violet-300' />
        <div>
          <h3 className='mb-5 text-center'>Sign On</h3>
          <Form
            submit={
              async (data: { [key: string]: string }) => await submit(data as z.infer<typeof registerFormTypeSchema>, 'signOn')
            }
            fieldsData={[fieldsData[0], fieldsData[2]]}
            css='w-64 flex flex-col items-center'
            btnData={{ text: 'Create Account', hoverColor: 'hover:bg-violet-300' }}
            schema={registerFormTypeSchema}
          />
        </div>
      </div>
      <AuthProviderBlock submit={submitViaProvider} />
    </>
  )

  return (
    <>
      <div className=''>
        <span>Improve your English! Just </span>
        <span className='link' onClick={() => setShow(true)}>join</span>
      </div>
      <Modal isShow={isShow} close={() => setShow(false)} title='Welcome!' content={modalContent} />
      {isLoading && <Spinner />}
    </>
  )
}
