import { ReactNode } from 'react'
import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegisterReturn } from 'react-hook-form'

import { InputTypes } from '@/types/FormTypes'

type InputPropsType = InputTypes & {
  errors:  FieldErrors<FieldValues> | Merge<FieldError, FieldErrorsImpl>,
  register: UseFormRegisterReturn
}

export default function Input (props: InputPropsType) {
  const { type = 'text', blockStyle = '', inputStyle, errors, placeholder, name = 'name', register } = props

  return (
    <div className={`${blockStyle} relative`}>
      <input
        className={inputStyle}
        placeholder={placeholder}
        { ...register }
        type={type}
      />
      {
        errors?.[name] && <div className='px-3 text-red-600 text-sm absolute'>{errors[name]?.message as ReactNode}</div>
      }
    </div>
  )
}
