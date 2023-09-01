'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import Navigation from '../Navigation'
import Sidebar from '../Sidebar'
import { profileAppPath } from '@/app/utils/paths'

export default function Lyout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isShowSidebar = pathname !== '/' && pathname !== profileAppPath

  return (
    <div className={`wrap grid grid-rows-[auto_1fr_100px] grid-cols-[auto_1fr_1fr] h-screen`}>
      <header className='col-start-1 col-end-4 h-fit p-5 bg-cyan-400 text-lg'><Navigation /></header>
      {
        isShowSidebar &&
        <aside className='col-start-1 col-end-2 row-start-2 row-end-4 bg-orange-100'><Sidebar pathname={pathname} /></aside>
      }
      <main className='col-start-2 col-end-4 p-5 bg-slate-50 overflow-auto transition-all'>{children}</main>
      <footer className='py-5 px-8 bg-red-500 col-start-2 col-end-4 transition-all'>Footer</footer>
    </div>
  )
}
