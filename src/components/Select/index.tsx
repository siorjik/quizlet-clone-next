'use client'

import { SelectType } from '@/types/SelectTypes'

export default function Select(props: SelectType) {
  const { name, options, placeholder, style, label, isRequired, disabled = false, value, onChange = () => {} } = props

  return (
    <div className={`relative`}>
      {
        label && <label className='absolute px-2 left-5 top-[-8px] text-xs bg-white rounded-xl'>
          {label}
          {isRequired && <span className='ml-1 text-red-500'>*</span>}
        </label>
      }
      <select
        name={name} 
        className={`select ${style}`}
        disabled={disabled}
        defaultValue={value || ''} onChange={({ target: { value } }) => onChange(value)}
      >
        <option value='' disabled>{placeholder}</option>
        {options.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
      </select>
    </div>
  )
}
