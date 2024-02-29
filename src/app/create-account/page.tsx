'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

import Spinner from '@/components/Spinner'
import ToastMessage from '@/components/ToastMessage'
import Form from '@/components/Form'

import apiService from '@/services/apiService'
import { getUserApiPath, loginAppPath } from '@/utils/paths'
import { UserType } from '@/types/UserTypes'
import { ApiErrType } from '@/types/ErrorTypes'
import getApiErrMessage from '@/helpers/getApiErrMessage'

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false)

  const submit = async (data: { [key: string]: string }): Promise<void> => {
    setLoading(true)

    try {
      await apiService<UserType | ApiErrType>({ url: getUserApiPath(), body: data, method: 'POST' })
      
      setLoading(false)

      toast(
        'User was created. Check email to create a password and finish registration.',
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
      name: 'name',
      type: 'text',
      label: 'Name',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
      validation: {
        required: 'Required!',
      }
    },
  ]

  return (
    <>
      <div className='h-[100dvh] flex flex-col justify-center items-center'>
        <h2 className='page-title'>Sign On</h2>
        <Form
          submit={submit}
          fieldsData={fieldsData}
          css='w-4/5 md:w-1/2 max-w-sm flex flex-col items-center'
          btnData={{ text: 'Create Account' }}
          isReset
        />
        <p className='mt-10'>
          Go to <Link className='text-amber-600 border-b-2 border-amber-700' href={loginAppPath}>Sign In</Link>
        </p>
      </div>
      <ToastMessage />
      {isLoading && <Spinner />}
    </>
  )
}
