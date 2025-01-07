import { ReactNode } from 'react'

import { FormInputPropType } from '@/types/FormTypes'

export default function Input(props: FormInputPropType) {
  const {
    type = 'text', blockStyle = '', inputStyle, errors, placeholder, name = 'name', register, inputRef, label, isRequired = false
  } = props

  return (
    <div className={`${blockStyle} relative`}>
      {
        label && <label className='absolute px-2 left-5 top-[-8px] text-xs bg-white dark:bg-gray-800 rounded-xl z-[1]'>
          {label}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>
      }
      <input
        className={`dark:bg-gray-800 ${inputStyle}`}
        placeholder={placeholder}
        {...register}
        type={type}
        required={!!isRequired}
        ref={(el) => {
          register.ref(el)

          if (inputRef) inputRef.current = el
        }}
      />
      {
        errors?.[name] && <div className='px-3 text-red-600 text-sm relative'>{errors[name]?.message as ReactNode}</div>
      }
    </div>
  )
}
