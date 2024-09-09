'use client'

import { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import menuIcon from '@/../public/images/mob-menu.svg'
import logoutIcon from '@/../public/images/logout.svg'
import userIcon from '@/../public/images/user.svg'
import addUserIcon from '@/../public/images/add-user.svg'
import loginIcon from '@/../public/images/login.svg'
import logo from '@/../public/images/logo.png'

import { createAccountAppPath, getLogoutApiPath, homeAppPath, libraryAppPath, loginAppPath, profileAppPath } from '@/utils/paths'
import { broadcast } from '@/services/eventBusService'
import { EventNames } from '@/utils/constants'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'

export default function Navigation({ isSmall }: { isSmall: boolean }) {
  const [isShowMobMenu, setShowMobMenu] = useState(false)

  const pathname = usePathname()
  const { push } = useRouter()
  const { data: session } = useSession()

  const isAuth = !!session

  useEffect(() => {
    if (isShowMobMenu) broadcast(EventNames.isShowMobMenu, true)
    else broadcast(EventNames.isShowMobMenu, false)
  }, [isShowMobMenu])

  const menu = [
    {
      title: 'Home',
      path: homeAppPath,
    },
    {
      title: 'My Library',
      path: libraryAppPath
    }
  ]

  if (!isAuth) menu.length = 1

  const logout = async (): Promise<void> => {
    const res = await apiService<boolean | ApiErrType>({ url: getLogoutApiPath() })

    if (typeof res === 'boolean' && res) signOut({ callbackUrl: '/' })
  }

const src = isAuth && session.user?.image ? session.user.image : isAuth && !session.user?.image ? userIcon : addUserIcon

const getUserBlock = (isMobile: boolean = false) => (
  <div className={`user flex justify-between ${isMobile ? 'space-x-5' : ''}`}>
      <Link href={isAuth ? profileAppPath : createAccountAppPath}>
        <Image
          className={`${isSmall ? 'h-[25px] w-[25px]' : 'h-[30px] w-[30px]'} rounded-full transition-all`}
          src={src}
          width={30}
          height={30}
          alt='user' />
      </Link>
      <span className='cursor-pointer' onClick={isAuth ? logout : () => push(loginAppPath)}>
        <Image
          className={`${isSmall ? 'h-[25px] w-[25px]' : 'h-[30px] w-[30px]'} transition-all`}
          src={isAuth ? logoutIcon : loginIcon} alt='logout' />
      </span>
    </div>
  )
  
  const getMenuItem = ({ path, title }: { path: string, title: string }, isMobile?: boolean) => {
    let css: string = ''
    
    if (pathname === path || (pathname.startsWith(path) && path !== '/')) {
      if (isMobile) css = 'text-gray-700 font-bold'
      else css = '!border-cyan-600 pb-[1.4rem]'
    }

    return (
      <Link
        className={`
          px-2 text-gray-500 border-b-2 border-transparent font-semibold hover:border-cyan-500
          ${isSmall || isMobile ? '!pb-2' : 'pb-[1.4rem]'} ${css} transition-[border-color,padding]
        `}
        href={path}
      >{title}</Link>
    )
  }

  return (
    <>
      {
        session !== undefined && (
          <>
            <div className='hidden md:grid grid-cols-[100px_1fr_80px]'>
              <Link href='/'>
                <Image
                  className={`
                  absolute ${isSmall ? 'h-[30px] w-[30px] bottom-[5px]' : 'h-[50px] w-[50px] bottom-[10px]'} transition-all
                `}
                  src={logo} alt='logo' />
              </Link>
              <div className='menu space-x-5'>
                {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item)}</Fragment>)}
              </div>
              {getUserBlock()}
            </div>

            {/* mobile */}
            <div className='flex justify-between text-center md:hidden'>
              <span onClick={() => setShowMobMenu(!isShowMobMenu)}><Image src={menuIcon} alt='menu' /></span>
              {getUserBlock(true)}
              {
                isShowMobMenu &&
                <div
                  className='fixed w-screen h-screen top-0 right-0 flex justify-center bg-slate-500/[0.3]'
                  onClick={() => setShowMobMenu(!isShowMobMenu)}
                >
                  <div className='mob-menu-content flex flex-col self-start w-72 bg-slate-200 py-5 my-20 rounded-md'>
                    <Image className='mx-auto mb-5' height={70} width={70} src={logo} alt='logo' />
                    {menu.map((item, index) => <Fragment key={index}>{getMenuItem(item, true)}</Fragment>)}
                    <div className='user flex justify-evenly mt-3 border-t-2 border-slate-300 pt-4'>
                      <Link href={isAuth ? profileAppPath : createAccountAppPath}>
                        <Image className='rounded-full' src={src} width={30} height={30} alt='user' />
                      </Link>
                      <span
                        className='cursor-pointer'
                        onClick={isAuth ? logout : () => push(loginAppPath)}
                      ><Image width={30} height={30} src={isAuth ? logoutIcon : loginIcon} alt='user' /></span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </>
        )
      }
    </>
  )
}
