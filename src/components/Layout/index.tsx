'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import upIcon from '@/../public/images/chevron-up.svg'

import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import ToastMessage from '../ToastMessage'

import { setsAppPath, videosAppPath } from '@/utils/paths'

const sidebarPathList: string[] = [setsAppPath, videosAppPath]

export default function Layout({ children }: { children: ReactNode }) {
  const [isSmallHeader, setSmallHeader] = useState(false)

  const pathname = usePathname()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = mainRef.current!

    div.addEventListener('scroll', () => setSmallHeader(div.scrollTop > 500))

    return () => {
      div.removeEventListener('scroll', () => setSmallHeader(div.scrollTop > 500))
    }
  }, [])

  const isShowSidebar = sidebarPathList.find(item => item === pathname)

  return (
    <div className={`grid grid-cols-[auto_1fr] h-dvh`}>
      <header
        className={`
          ${isSmallHeader ? 'h-10 p-2 text-sm !bg-cyan-300/[0.5] absolute w-full' : 'h-[70px] py-5 px-5 text-lg'}
          fixed w-full bg-cyan-300 z-10 transition-all
        `}
      >
        <Navigation isSmall={isSmallHeader} />
      </header>
      {
        isShowSidebar &&
        <aside className='col-start-1 col-end-2 mt-[70px] bg-orange-100'
        ><Sidebar pathname={pathname} /></aside>
      }
      <main
        className={`
          w-full px-5 grid ${isSmallHeader ? 'h-[100dvh]' : 'h-[calc(100dvh-70px)] mt-[70px]'}
          grid-rows-[1fr_minmax(65px,auto)] col-start-2 col-end-3 bg-slate-50 overflow-auto transition-all scroll-smooth
        `}
        ref={mainRef}>
        <div className='py-5 w-full max-w-7xl mx-auto'>{children}</div>
        <footer className='mx-[-20px] py-5 px-5 bg-gradient-to-t from-red-400 to-red-200'>
          <div className='max-w-7xl mx-auto'>&copy; 2024</div>
        </footer>
      </main>
      {
        isSmallHeader &&
        <button
          className='absolute bottom-36 right-10 p-3 rounded-xl bg-orange-300/[0.5]'
          onClick={() => mainRef.current!.scrollTop = 0}
        >
          <Image src={upIcon} alt='up' />
        </button>
      }
      <ToastMessage />
    </div>
  )
}
