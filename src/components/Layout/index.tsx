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
      setSmallHeader(div.scrollTop > 235)
    })

    return () => {
      div.removeEventListener('scroll', () => {})
    }
  }, [])

  if (pathname === '/not-found') console.log('not-found')

  const isShowSidebar = sidebarPathList.find(item => item === pathname)

  return (
    <div className={`wrap grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr_1fr] h-screen`}>
      <header
        className={`
          ${isSmallHeader ? 'h-10 p-2 text-sm bg-cyan-400/[0.5] absolute w-full z-10' : 'h-[70px] p-5 text-lg'}
          col-start-1 col-end-4 bg-cyan-400 transition-all
        `}
      >
        <Navigation isSmall={isSmallHeader} />
      </header>
      {
        isShowSidebar &&
        <aside className='col-start-1 col-end-2 row-start-2 row-end-4 bg-orange-100'><Sidebar pathname={pathname} /></aside>
      }
      <main className='col-start-2 col-end-4 p-5 bg-slate-50 overflow-auto transition-all scroll-smooth' ref={mainRef}>
        {children}
      </main>
      <footer className='py-5 px-8 h-20 bg-red-300 col-start-2 col-end-4 transition-all'>Footer</footer>
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
