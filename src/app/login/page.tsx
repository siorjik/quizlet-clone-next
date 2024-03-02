'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Link from 'next/link'

import Form from '@/components/Form'
import ToastMessage from '@/components/ToastMessage'
import Spinner from '@/components/Spinner'
import Modal from '@/components/Modal'

import { createAccountAppPath, getRecoveryPasswordApiPath } from '@/utils/paths'
import apiService from '@/services/apiService'
import getApiErrMessage from '@/helpers/getApiErrMessage'
import { ApiErrType } from '@/types/ErrorTypes'

export default function Login() {
  const [isLoading, setLoading] = useState(false)
  const [isShow, setShow] = useState(false)

  const { push } = useRouter()

  const submit = async (data: { [key: string]: string }): Promise<void> => {
    setLoading(true)

    const res = await signIn('credentials', { redirect: false, ...data })

    if (!res?.error) push('/')
    else {
      setLoading(false)

      toast(res.error, { position: 'bottom-left', type: 'error' })
    }
  }

  const passwordRecovery = async (body: { [key: string]: string }): Promise<void> => {
    setLoading(true)

    try {
      await apiService({ url: getRecoveryPasswordApiPath(), body, method: 'POST' })

      setLoading(false)
      setShow(false)

      toast(
        'Password recovery request was sent! Check your email!',
        { position: 'bottom-center', type: 'success' }
      )
    } catch (error) {
      const err = error as ApiErrType

      setLoading(false)

      toast(getApiErrMessage(err), { position: 'bottom-left', type: 'error' })

      throw new Error(getApiErrMessage(err))
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
      validation: {
        required: 'Required!',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email!'
        }
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
      validation: {
        required: 'Required!',
      }
    }
  ]

  const modalContent = (
    <div className=''>
      <Form
        submit={passwordRecovery}
        fieldsData={[fieldsData[0]]}
        css='w-64 md:w-4/5 mx-auto flex flex-col items-center'
        btnData={{ text: 'Recover Password', hoverColor: 'hover:bg-violet-300' }}
      />
    </div>
  )

  return (
    <>
      <div className='h-[100dvh] flex flex-col justify-center items-center'>
        <h2 className='page-title'>Sign In</h2>
        <Form
          submit={submit}
          fieldsData={fieldsData}
          css='w-4/5 md:w-1/2 max-w-sm flex flex-col items-center'
          btnData={{ text: 'Login' }}
        />
        <p className='mt-10' onClick={() => setShow(true)}>
          Forgot your password? <span className='link'>Password Recovery</span>
        </p>
        <p className='mt-10'>Go to <Link className='link' href={createAccountAppPath}>Sign On</Link></p>
      </div>
      <ToastMessage />
      {isLoading && <Spinner />}
      <Modal isShow={isShow} close={() => setShow(false)} title='Password Recovery' content={modalContent} />
    </>
  )
}
