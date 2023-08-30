import { ReactNode } from 'react'
import Navigation from '../Navigation'

export default function Lyout({ children }: { children: ReactNode }) {
  return (
    <div className='wrap grid grid-rows-[70px_1fr_100px] h-screen'>
      <header><Navigation /></header>
      <main className='py-5 px-8 overflow-auto'>{children}</main>
      <footer className='py-5 px-8 bg-red-500'>Footer</footer>
    </div>
  )
}
