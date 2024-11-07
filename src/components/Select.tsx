'use client'

import { ReactNode } from 'react'

import { FormSelectPropType } from '@/types/FormTypes'

export default function Select(props: FormSelectPropType) {
  const { name, options, placeholder, style, errors, register, label, isRequired, disabled = false } = props

  return (
    <div className={`relative`}>
      {
        label && <label className='absolute px-2 left-5 top-[-8px] text-xs bg-white rounded-xl'>
          {label}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>
      }
      <select className={style} {...register} disabled={disabled} defaultValue=''>
        <option value='' disabled>{placeholder}</option>
        {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
      </select>
      {
        errors?.[name] && <div className='px-3 text-red-600 text-sm relative'>{errors[name]?.message as ReactNode}</div>
      }
    </div>
  )
}
