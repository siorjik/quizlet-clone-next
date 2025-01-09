import { MutableRefObject } from 'react'

export type SelectType = {
  name: string,
  value?: string,
  options: { label: string, value: string }[],
  disabled?: boolean,
  label?: string,
  style: string,
  placeholder?: string,
  inputRef?: MutableRefObject<HTMLInputElement | null>,
  isRequired?: boolean,
  onChange?: (value: string) => void
}
