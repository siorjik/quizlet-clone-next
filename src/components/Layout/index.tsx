'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import upIcon from '@/../public/images/chevron-up.svg'

import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import ToastMessage from '../ToastMessage'
import Spinner from '../Spinner'

import { setsAppPath, videosAppPath } from '@/utils/paths'

const sidebarPathList: string[] = [setsAppPath, videosAppPath]

export default function Layout({ children }: { children: ReactNode }) {
  const [isSmallHeader, setSmallHeader] = useState(false)
  const [isShowBtn, setShowBtn] = useState(false)

  const pathname = usePathname()
  const { data: session, status } = useSession()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!session) return

    const div = mainRef.current!

    const cb = () => {
      setSmallHeader(div.scrollTop > 5)
      setShowBtn(div.scrollTop > 400)
    }

    div.addEventListener('scroll', cb)

    return () => {
      div.removeEventListener('scroll', cb)
    }
  }, [session])

  const isShowSidebar = sidebarPathList.find(item => item === pathname)
  const isShowContent = status === 'unauthenticated' || ((status === 'authenticated' || status === 'loading') && session)

  return (
    <>
      {isShowContent ? <div className={`grid grid-cols-[auto_1fr] h-dvh`}>
        <header
          className={`
          ${isSmallHeader ? 'h-10 p-2 text-sm !bg-cyan-300/[0.5] absolute w-full' : 'h-[60px] py-4 px-5 text-lg'}
          fixed w-full bg-cyan-300 z-10 transition-all
        `}
        >
          <Navigation isSmall={isSmallHeader} />
        </header>
        {
          isShowSidebar &&
          <aside className={`col-start-1 col-end-2 ${isSmallHeader ? 'mt-[40px]' : 'mt-[60px]'} bg-orange-100 transition-all`}
          ><Sidebar pathname={pathname} /></aside>
        }
        <main
          className={`
          w-full grid ${isSmallHeader ? 'h-[100dvh]' : 'h-[calc(100dvh-60px)] mt-[60px]'}
          grid-rows-[1fr_minmax(60px,auto)] col-start-2 col-end-3 bg-slate-50 overflow-auto transition-all scroll-smooth
        `}
          ref={mainRef}>
          <div className='py-5 px-5 w-full max-w-7xl mx-auto'>{children}</div>
          <footer className='h-[60px] py-4 flex items-center text-sm bg-gradient-to-t from-red-400 to-red-200'>
            <div className='px-5 mx-auto w-full max-w-7xl'>&copy; {new Date().getFullYear()}</div>
          </footer>
        </main>
        {
          isShowBtn &&
          <button
            className='absolute bottom-36 right-10 p-3 rounded-xl bg-orange-300/[0.5]'
            onClick={() => mainRef.current!.scrollTop = 0}
          >
            <Image src={upIcon} alt='up' />
          </button>
        }
      </div> : <Spinner />}
      <ToastMessage />
    </>
  )
}
