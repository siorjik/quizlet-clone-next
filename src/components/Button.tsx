'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button({
  children, type = 'button', css = '', click = () => { }, hoverColor = '', isDisabled = false }: ButtonTypes
) {
  const hover = hoverColor || 'hover:bg-slate-200'

  return (
    <button
      className={`border-2 rounded-md px-4 py-1 ${hover} ${css} transition-all`}
      type={type as 'button' | 'submit'}
      onClick={click}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
