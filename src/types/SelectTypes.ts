import { MutableRefObject } from 'react'

export type SelectType = {
  name: string,
  options: { label: string, value: string }[],
  disabled?: boolean,
  label?: string,
  style: string,
  placeholder?: string,
  inputRef?: MutableRefObject<HTMLInputElement | null>,
  isRequired?: boolean,
  validation?: { required?: string, pattern?: { value: string, message: string } }
}
