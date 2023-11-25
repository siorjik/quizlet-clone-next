import { ReactNode } from 'react'

import { FormInputPropTypes } from '@/types/FormTypes'

export default function Input(props: FormInputPropTypes) {
  const { type = 'text', blockStyle = '', inputStyle, errors, placeholder, name = 'name', register, inputRef, label } = props

  return (
    <div className={`${blockStyle} relative`}>
      {label && <label className='absolute left-5 top-[-8px] text-xs'>{label}</label>}
      <input
        className={inputStyle}
        placeholder={placeholder}
        {...register}
        type={type}
        ref={(el) => {
          register.ref(el)

          inputRef!.current = el
        }}
      />
      {
        errors?.[name] && <div className='px-3 text-red-600 text-sm absolute'>{errors[name]?.message as ReactNode}</div>
      }
    </div>
  )
}
