'use client'

import { ButtonTypes } from '@/types/ButtonTypes'

export default function Button({
  bg = 'slate', size = 'md', children, type = 'button', css = '', click = () => { }, isDisabled = false }: ButtonTypes
) {
  const sizeStyle = { sm: 'px-2 py-1 text-sm', md: 'px-4 py-2', lg: 'px-5 py-3' }

  const bgStyle = {
    slate: 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500',
    violet: 'bg-violet-300 dark:bg-violet-600 hover:bg-violet-400 dark:hover:bg-violet-800',
    lime: 'bg-lime-200 dark:bg-lime-600 hover:bg-lime-300 dark:hover:bg-lime-700',
    sky: 'bg-sky-100 dark:bg-sky-600 hover:bg-sky-200 dark:hover:bg-sky-700'
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
