'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

import Modal from '@/components/Modal'
import Form from '@/components/Form/FormWithZod'
import Spinner from '@/components/Spinner'
import AuthProviderBlock from '@/components/AuthProvidersBlock'

import apiService from '@/services/apiService'
import { UserType } from '@/types/UserTypes'
import { getUserApiPath } from '@/utils/paths'
import { ApiErrType } from '@/types/ErrorTypes'
import getApiErrMessage from '@/helpers/getApiErrMessage'
import { loginFormTypeSchema, registerFormTypeSchema } from '@/types/forms/auth'

export default function Auth() {
  const [isShow, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const submit = async (data: { [key: string]: string }, action: 'signIn' | 'signOn'): Promise<void> => {
    let errMess
    const isSignOn = action === 'signOn'

    setLoading(true)

    if (isSignOn) {
      try {
          await apiService<UserType>({ url: getUserApiPath(), body: { ...data }, method: 'POST' })
  
          toast(
            'User was created. Check email to create a password and finish registration.',
            { position: 'bottom-center', type: 'success' }
          )
  
        setShow(false)
      } catch (error) {
        const err = error as ApiErrType

        errMess = getApiErrMessage(err)
      }
    } else {
      const res = await signIn('credentials', { redirect: false, ...data })

      if ('error' in res!) errMess = res.error
    }

    setLoading(false)

    if (errMess) toast(errMess, { position: 'bottom-left', type: 'error' })
    else setShow(false)
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
            submit={async (data: { [key: string]: string }) => await submit(data, 'signIn')}
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
            submit={async (data: { [key: string]: string }) => await submit(data, 'signOn')}
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
