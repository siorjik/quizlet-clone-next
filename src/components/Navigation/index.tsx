'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import menuIcon from '../../../public/mob-menu.svg'
import logoutIcon from '../../../public/logout.svg'
import userIcon from '../../../public/user.svg'

export default function Navigation() {
  const [isShow, setShow] = useState(false)

  const pathname = usePathname()

  const menu = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'My Library',
      path: '/library'
    }
  ]

  const userBlock = (
    <div className='flex space-x-5'>
      <Link href={'profile'}><Image src={userIcon} alt='user' /></Link>
      <span className='cursor-pointer'><Image src={logoutIcon} alt='logout' /></span>
    </div>
  )

  const getMenuItem = ({ path, title }: { path: string, title: string, isMobile?: boolean }, isMobile?: boolean) => {
    let css: string = ''

    if (pathname === path) {
      if (isMobile) css = 'text-slate-500 font-bold'
      else css = '!border-gray-600 pb-5'
    }

    return (
      <Link
        className={`px-2 text-gray-600 border-b-2 border-transparent hover:text-gray-800 transition-all ${css}`}
        href={path}
      >{title}</Link>
    )
  }

  return (
    <>
      <div className='header-content hidden md:grid grid-cols-[100px_minmax(0,_1fr)_70px] gap-1 bg-cyan-500 text-lg py-5 p-10'>
        <div className='logo'>Logo</div>
        <div className='menu space-x-5'>
          {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item)}</Fragment>)}
        </div>
        <div className='user'>{userBlock}</div>
      </div>

      <div className='header-content-mobile flex justify-around bg-cyan-500 text-lg py-5 p-10 text-center md:hidden'>
        <span onClick={() => setShow(!isShow)}><Image src={menuIcon} alt='menu' /></span>
        {userBlock}
        {
          isShow &&
          <div
            className='mob-menu fixed w-screen h-screen top-0 flex justify-center z-10 bg-slate-500/[0.3]'
            onClick={() => setShow(!isShow)}
          >
            <div className='mob-menu-content flex flex-col self-start w-72 bg-slate-200 py-5 my-20 rounded-md'>
              {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item, true)}</Fragment>)}
              <div className='user flex justify-evenly mt-5 border-t-2 border-slate-300 pt-4'>
                <Link href={'profile'}><Image src={userIcon} alt='user' /></Link>
                <span className='cursor-pointer'><Image src={logoutIcon} alt='user' /></span>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
