'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button({
  bg = 'slate', size = 'md', children, type = 'button', css = '', click = () => { }, isDisabled = false }: ButtonTypes
) {
  const sizeStyle = { sm: '', md: 'px-4 py-2', lg: 'px-5 py-3' }

  const bgStyle = {
    slate: 'bg-slate-200 hover:bg-slate-300',
    violet: 'bg-violet-300 hover:bg-violet-400',
    lime: 'bg-lime-200 hover:bg-lime-300',
    sky: 'bg-sky-100 hover:bg-sky-200'
  }

  return (
    <button
      className={`${sizeStyle[size]} ${bgStyle[bg as keyof typeof bgStyle]} rounded-md ${css} transition-all`}
      type={type}
      onClick={click}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
