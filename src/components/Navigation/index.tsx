'use client'

import { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import menuIcon from '../../../public/mob-menu.svg'
import logoutIcon from '../../../public/logout.svg'
import userIcon from '../../../public/user.svg'
import { libraryAppPath, profileAppPath } from '@/utils/paths'
import { broadcast } from '@/services/eventBusService'
import { EventNames } from '@/utils/constants'

export default function Navigation({ isSmall }: { isSmall: boolean }) {
  const [isShowMobMenu, setShowMobMenu] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    if (isShowMobMenu) broadcast(EventNames.isShowMobMenu, true)
    else broadcast(EventNames.isShowMobMenu, false)
  }, [isShowMobMenu])

  const menu = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'My Library',
      path: libraryAppPath
    }
  ]

  const getUserBlock = (isMobile: boolean = false) => (
    <div className={`user flex justify-between self-center ${isMobile ? 'space-x-5' : ''}`}>
      <Link href={profileAppPath}><Image src={userIcon} alt='user' /></Link>
      <span className='cursor-pointer' onClick={() => signOut()}><Image src={logoutIcon} alt='logout' /></span>
    </div>
  )

  const getMenuItem = ({ path, title }: { path: string, title: string }, isMobile?: boolean) => {
    let css: string = ''

    if (pathname === path || (pathname.startsWith(path) && path !== '/')) {
      if (isMobile) css = '!text-slate-400 font-bold'
      else css = '!border-gray-600 pb-[1.4rem]'
    }

    return (
      <Link
        className={`
          px-2 text-gray-600 border-b-2 border-transparent font-semibold hover:border-gray-600
          ${isSmall || isMobile ? '!pb-2' : 'pb-[1.4rem]'} ${css} transition-[border-color,padding]
        `}
        href={path}
      >{title}</Link>
    )
  }

  return (
    <>
      <div className='header-content hidden md:grid grid-cols-[100px_1fr_70px]'>
        <Link href='/'>Logo</Link>
        <div className='menu space-x-5'>
          {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item)}</Fragment>)}
        </div>
        {getUserBlock()}
      </div>

      <div className='header-content-mobile flex justify-between text-center md:hidden'>
        <span onClick={() => setShowMobMenu(!isShowMobMenu)}><Image src={menuIcon} alt='menu' /></span>
        {getUserBlock(true)}
        {
          isShowMobMenu &&
          <div
            className='mob-menu fixed w-screen h-screen top-0 right-0 flex justify-center z-10 bg-slate-500/[0.3]'
            onClick={() => setShowMobMenu(!isShowMobMenu)}
          >
            <div className='mob-menu-content flex flex-col self-start w-72 bg-slate-200 py-5 my-20 rounded-md'>
              {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item, true)}</Fragment>)}
              <div className='user flex justify-evenly mt-3 border-t-2 border-slate-300 pt-4'>
                <Link href={profileAppPath}><Image src={userIcon} alt='user' /></Link>
                <span className='cursor-pointer' onClick={() => signOut()}><Image src={logoutIcon} alt='user' /></span>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
