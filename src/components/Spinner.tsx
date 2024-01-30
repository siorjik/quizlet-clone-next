'use client'

import { InfinitySpin } from 'react-loader-spinner'

export default function Spinner() {
  return (
    <div className='flex justify-center items-center absolute w-full h-full bg-fuchsia-200/[0.5] top-0 left-0'>
      <InfinitySpin color='#d946ef' />
    </div>
  )
}
