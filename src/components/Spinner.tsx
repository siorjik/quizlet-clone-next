'use client'

import { InfinitySpin } from 'react-loader-spinner'
import { useTheme } from 'next-themes'

export default function Spinner() {
  const { theme } = useTheme()

  const color = theme === 'light' ? '#d946ef' : '#f0abfc'

  return (
    <div className='
      flex justify-center items-center absolute w-full h-full bg-fuchsia-200/[0.5] dark:bg-fuchsia-900/[0.5] top-0 left-0 z-50
    '>
      <InfinitySpin color={color} />
    </div>
  )
}
