import Link from 'next/link'

import CreateAccForm from './_components/CreateAccForm'

import { loginAppPath } from '@/utils/paths'

export default function CreateAccount() {
  return (
    <>
      <div className='w-4/5 md:w-1/2 max-w-sm h-[100dvh] mx-auto flex flex-col justify-center items-center'>
        <h2 className='page-title'>Sign On</h2>
        <CreateAccForm />
        <p className='mt-10'>
          Go to <Link className='link' href={loginAppPath}>Sign In</Link>
        </p>
      </div>
    </>
  )
}
