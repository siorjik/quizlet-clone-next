'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import Form from '@/components/Form'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { UserType } from '@/types/UserTypes'
import { getUserApiPath } from '@/utils/paths'
import getApiErrMessage from '@/helpers/getApiErrMessage'
import AuthProviderBlock from '@/components/AuthProvidersBlock'

export default function Home() {
  const [isShow, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const { data } = useSession()

  const isAuth = !!data

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
          />
        </div>
      </div>
      <AuthProviderBlock submit={submitViaProvider} />
    </>
  )

  return (
    <>
      {
        data === undefined ? <Spinner /> :
          <Layout>
            {
              isAuth ? <h2 className='text-red-300'>Home</h2> : <>
                <span>Improve your English! Just </span>
                <span className='link' onClick={() => setShow(true)}>join</span>
              </>
            }
            <Modal isShow={isShow} close={() => setShow(false)} title='Welcome!' content={modalContent} />
            {isLoading && <Spinner />}
          </Layout>
      }
    </>
  )
}
