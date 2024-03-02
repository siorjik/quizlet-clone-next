'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

import Spinner from '@/components/Spinner'
import ToastMessage from '@/components/ToastMessage'
import Form from '@/components/Form'

import getApiErrMessage from '@/helpers/getApiErrMessage'
import { ApiErrType } from '@/types/ErrorTypes'
import apiService from '@/services/apiService'
import { getCreatePasswordApiPath, loginAppPath } from '@/utils/paths'

export default function CreatePassword({ token }: { token: string }) {
  const [isLoading, setLoading] = useState(false)

  const submit = async (data: { [key: string]: string }): Promise<void> => {
    const { password, passConfirm } = data

    if (password !== passConfirm) {
      toast('The Password and Confirm Password must be the same!', { position: 'bottom-left', type: 'error' })

      return
    }

    setLoading(true)

    try {
      await apiService({ url: getCreatePasswordApiPath(), body: { password, token }, method: 'POST' })

      setLoading(false)

      toast(
        'Password was created! Let`s login!',
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
      name: 'password',
      type: 'password',
      label: 'Password',
      inputStyle: 'input',
      blockStyle: 'w-full mb-8',
      isRequired: true,
      validation: {
        required: 'Required!',
      }
    },
    {
      name: 'passConfirm',
      type: 'password',
      label: 'Confirm Password',
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
      <Form
        submit={submit}
        fieldsData={fieldsData}
        css='w-4/5 md:w-1/2 max-w-sm flex flex-col items-center'
        btnData={{ text: 'Create Password' }}
        isReset
      />
      <p className='mt-10'>
        Go to <Link className='link' href={loginAppPath}>Sign In</Link>
      </p>
      <ToastMessage />
      {isLoading && <Spinner />}
    </>
  )
}
