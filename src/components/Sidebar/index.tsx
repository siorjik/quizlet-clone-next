'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import leftArrowIcon from '@/../public/arrow-left-circle.svg'
import rightArrowIcon from '@/../public/arrow-right-circle.svg'
import { libraryAppPath, setsAppPath, videosAppPath } from '@/utils/paths'
import { libraryData } from './sidebarData'

type SidebarType = { title: string, path: string, icon: StaticImport }[]

export default function Sidebar({ pathname }: { pathname: string }) {
  const [isStretch, setStretch] = useState(false)
  const [isMobile, setMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setMobile(window.innerWidth < 768)

    window.addEventListener('resize', () => setMobile(window.innerWidth < 768))

    return () => {
      window.removeEventListener('resize', () => setMobile(window.innerWidth < 768))
    }
  }, [])

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
                !isStretch && <button
                  className='absolute left-[20px] top-[57px] bg-slate-200 rounded-full z-[2]'
                  onClick={() => setStretch(!isStretch)}
                ><Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
                </button>
              }

              <div
                className={`absolute w-[200px] h-full ${!isStretch ? 'left-[-200px]' : 'left-[0]'} bg-orange-100 transition-all`}
              >
                <button className='mb-8 m-3' onClick={() => setStretch(!isStretch)}>
                  <Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
                </button>
                {getSideBarContent()}
              </div>
            </>
        }
      </> : null
      }
    </>
  )
}
