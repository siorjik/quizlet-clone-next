'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Form from '@/components/Form'
import ToastMessage from '@/components/ToastMessage'

export default function Login() {
  const { push } = useRouter()

  const submit = async (data: { [key: string]: string }): Promise<void> => {
    const res = await signIn('credentials', { redirect: false, ...data })

    if (!res?.error) push('/')
    else toast(res.error, { position: 'bottom-left', type: 'error' })
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

  return (
    <>
      <div className='h-[100dvh] flex flex-col justify-center items-center'>
        <h2 className='page-title'>Login</h2>
        <Form submit={submit} fieldsData={fieldsData} css='w-4/5 md:w-1/2 max-w-lg flex flex-col items-center' />
      </div>
      <ToastMessage />
    </>
  )
}
