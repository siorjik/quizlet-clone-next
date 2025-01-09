'use client'

import Image from 'next/image'

import Button from './Button'

import googleIcon from '@/../public/images/google.svg'
import githubIcon from '@/../public/images/github.svg'

export default function AuthProviderBlock({ submit }: { submit: (name: string) => Promise<void> }) {
  return (
    <>
      <div className='w-full h-[25px] my-5 flex justify-between'>
        <div className='w-[43%] h-[2px] mt-[12px] bg-sky-200 dark:bg-sky-500' /><span>OR</span>
        <div className='w-[43%] h-[2px] mt-[12px] bg-sky-200 dark:bg-sky-500' />
      </div>
      <div className='w-full flex justify-around'>
        <Button bg='sky' click={() => submit('google')}>
          <div className='flex'><Image className='mr-3' src={googleIcon} alt='google' />Google</div>
        </Button>
        <Button bg='sky' click={() => submit('github')}>
          <div className='flex'><Image className='mr-3' src={githubIcon} alt='github' />Github</div>
        </Button>
      </div>
    </>
  )
}
