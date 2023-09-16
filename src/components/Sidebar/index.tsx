'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import leftArrowIcon from '@/../public/arrow-left-circle.svg'
import rightArrowIcon from '@/../public/arrow-right-circle.svg'
import { libraryAppPath, setsAppPath, videosAppPath } from '@/app/utils/paths'
import { libraryData } from './sidebarData'

type SidebarType = { title: string, path: string, icon: StaticImport }[]

export default function Sidebar({ pathname }: { pathname: string }) {
  const [isStretch, setStretch] = useState(false)

  useEffect(() => {
    if (isStretch) setStretch(false)
  }, [pathname])

  let sidebarData: SidebarType = []

  switch(pathname) {
    case libraryAppPath:
    case videosAppPath:
    case setsAppPath:
      sidebarData = libraryData
      break

    default: sidebarData = []
  }

  return (
    <div className={`sidebar overflow-auto ${!isStretch ? 'w-14 overflow-x-hidden' : 'w-48'} transition-all`}>
      <button className='mb-8 m-3' onClick={() => setStretch(!isStretch)}>
        <Image src={isStretch ? leftArrowIcon : rightArrowIcon} alt='left-arrow' priority />
      </button>
      {
        sidebarData.map((item, index) =>
          <Link
            key={index}
            className={`flex p-3 ${pathname === item.path ? 'bg-orange-200 rounded-r-full mr-1' : ''}`} href={item.path}
          >
            <Image src={item.icon} alt='icon' priority />
            <span className='ml-5'>{item.title}</span>
          </Link>
        )
      }
    </div>
  )
}
