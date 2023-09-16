'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button ({ children, type = 'buttton', css = '', click = () => {} }: ButtonTypes) {
  return (
    <button 
      className={`${css} border-2 rounded-md px-5 py-2 hover:bg-slate-200 transition-all`}
      type={type as 'button' | 'submit'}
      onClick={click}
    >
      {children}
    </button>
  )
}
