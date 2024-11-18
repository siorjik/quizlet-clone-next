'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button({
  children, type = 'button', css = '', click = () => { }, hoverColor = '', isDisabled = false }: ButtonTypes
) {
  const hover = hoverColor || 'hover:bg-slate-200'

  const style = !css ? 'btn' : `${css}`

  return (
    <button
      className={`${style} ${hover}`}
      type={type as 'button' | 'submit'}
      onClick={click}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
