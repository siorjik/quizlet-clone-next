'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import leftArrowIcon from '@/../public/images/arrow-left-circle.svg'
import rightArrowIcon from '@/../public/images/arrow-right-circle.svg'
import logo from '@/../public/images/logo.png'

import { libraryAppPath, setsAppPath, videosAppPath } from '@/utils/paths'
import { libraryData } from './sidebarData'
import { DataType, subscribe, unsubscribe } from '@/services/eventBusService'
import { EventNames } from '@/utils/constants'
import useWindowData from '@/hooks/useWindowData'

type SidebarType = { title: string, path: string, icon: StaticImport }[]

export default function Sidebar({ pathname }: { pathname: string }) {
  const [isStretch, setStretch] = useState(false)
  const [isShowMobMenu, setShowMobMenu] = useState(false)
  const { isMobile } = useWindowData()

  useEffect(() => {
    subscribe(EventNames.isShowMobMenu, (data: DataType) => setShowMobMenu(data as boolean))

    return () => unsubscribe(EventNames.isShowMobMenu, (data: DataType) => setShowMobMenu(data as boolean))
  }, [isShowMobMenu])

  useEffect(() => {
    if (isStretch) setStretch(false)
  }, [pathname])

  let sidebarData: SidebarType = []

  switch (pathname) {
    case libraryAppPath:
    case videosAppPath:
    case setsAppPath:
      sidebarData = libraryData
      break

    default: sidebarData = []
  }

  const getSideBarContent = () =>
    sidebarData.map((item, index) =>
      <Link
        key={index}
        className={`flex p-3 ${pathname === item.path ? 'bg-orange-200 rounded-r-full mr-1' : ''}`} href={item.path}
      >
        <Image src={item.icon} alt='icon' priority />
        <span className='ml-5'>{item.title}</span>
      </Link>

    )

  return (
    <>
      {isMobile !== undefined ? <>
        {
          !isMobile ? <div className={`sidebar overflow-auto ${!isStretch ? 'w-14 overflow-x-hidden' : 'w-48'} transition-all`}>
            <button className='mb-8 m-3' onClick={() => setStretch(!isStretch)}>
              <Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
            </button>
            {getSideBarContent()}
          </div>
            :
            <>
              {
                !isStretch && !isShowMobMenu && <button
                  className='absolute left-[20px] top-[57px] bg-slate-200 rounded-full z-10'
                  onClick={() => setStretch(!isStretch)}
                ><Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
                </button>
              }

              <div className={`
                absolute w-[200px] h-[calc(100dvh-70px)] z-[1]
                ${!isStretch ? 'left-[-200px]' : 'left-[0]'} bg-orange-100 transition-all
              `}>
                <button className='mb-5 m-3' onClick={() => setStretch(!isStretch)}>
                  <Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
                </button>
                <Image className='mx-auto mb-5' height={70} width={70} src={logo} alt='logo' />
                {getSideBarContent()}
              </div>
            </>
        }
      </> : null
      }
    </>
  )
}
