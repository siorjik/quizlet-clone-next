'use client'

import Image from 'next/image'

import Button from './Button'

import googleIcon from '@/../public/images/google.svg'
import githubIcon from '@/../public/images/github.svg'

export default function AuthProviderBlock({ submit }: { submit: (name: string) => Promise<void> }) {
  return (
    <>
      <div className='w-full h-[25px] my-10 flex justify-between'>
          <hr className='w-[43%] h-[2px] mt-[12px] bg-slate-200' /><span>OR</span>
          <hr className='w-[43%] h-[2px] mt-[12px] bg-slate-200' />
        </div>
        <div className='w-full flex justify-around'>
          <Button css='mr-1 flex items-center h-fit' click={() => submit('google')}>
            <Image className='mr-3' src={googleIcon} alt='google' />Google
          </Button>
          <Button css='ml-1 flex items-center h-fit' click={() => submit('github')}>
            <Image className='mr-3' src={githubIcon} alt='github' />Github
          </Button>
        </div>
    </>
  )
}
