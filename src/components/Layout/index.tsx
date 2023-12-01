'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import upIcon from '@/../public/chevron-up.svg'

import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import { setsAppPath, videosAppPath } from '@/utils/paths'

const sidebarPathList: string[] = [setsAppPath, videosAppPath]

export default function Lyout({ children }: { children: ReactNode }) {
  const [isSmallHeader, setSmallHeader] = useState(false)

  const pathname = usePathname()

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = mainRef.current!

    div.addEventListener('scroll', () => {
      setSmallHeader(div.scrollTop > 500)
    })

    return () => {
      div.removeEventListener('scroll', () => { })
    }
  }, [])

  const isShowSidebar = sidebarPathList.find(item => item === pathname)

  return (
    <div className={`wrap grid grid-cols-[auto_1fr] h-screen`}>
      <header
        className={`
          ${isSmallHeader ? 'h-10 p-2 text-sm bg-cyan-400/[0.5] absolute w-full z-10' : 'h-[70px] py-5 px-8 text-lg'}
          fixed w-full bg-cyan-400 transition-all
        `}
      >
        <Navigation isSmall={isSmallHeader} />
      </header>
      {
        isShowSidebar &&
        <aside className='col-start-1 col-end-2 mt-[70px] bg-orange-100'><Sidebar pathname={pathname} /></aside>
      }
      <main className={`
          grid ${isSmallHeader ? 'mt-[40px]' : 'mt-[70px]'} grid-rows-[1fr_70px]
          col-start-2 col-end-3 bg-slate-50 overflow-auto transition-all scroll-smooth
        `}
        ref={mainRef}>
        <div className='p-5'>{children}</div>
        <footer className='py-5 px-8 bg-red-300'>Footer</footer>
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
    </div>
  )
}
