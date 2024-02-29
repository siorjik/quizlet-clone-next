'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button({ children, type = 'button', css = '', click = () => { }, hoverColor = '' }: ButtonTypes) {
  const hover = hoverColor || 'hover:bg-slate-200'

  return (
    <button
      className={`border-2 rounded-md px-5 py-2 ${hover} ${css} transition-all`}
      type={type as 'button' | 'submit'}
      onClick={click}
    >
      {children}
    </button>
  )
}
