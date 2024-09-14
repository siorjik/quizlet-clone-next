import Link from 'next/link'

import LoginForm from './_components/LoginForm'

import { createAccountAppPath } from '@/utils/paths'

export default function Login() {
  return (
    <div className='w-4/5 md:w-1/2 max-w-sm h-[100dvh] mx-auto flex flex-col justify-center items-center'>
      <h2 className='page-title'>Sign In</h2>
      <LoginForm />
      <p className='mt-10'>
        Do not have an account yet? Go to <Link className='link' href={createAccountAppPath}>Sign On</Link>
      </p>
    </div>
  )
}
