import { useTheme } from 'next-themes'
import Image from 'next/image'

import sunIcon from '@/../public/images/sun.svg'
import moonIcon from '@/../public/images/moon.svg'

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme()

  return (
    <button className='border-2 border-black rounded-md' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'light' ? <Image src={moonIcon} alt='moon' /> : <Image src={sunIcon} alt='sun' />}
    </button>
  )
}
