import { MutableRefObject } from 'react'

export type InputType = {
  name: string,
  label?: string,
  type?: string,
  blockStyle?: string,
  inputStyle: string,
  placeholder?: string,
  inputRef?: MutableRefObject<HTMLInputElement | null>,
  isRequired?: boolean,
  validation?: { required?: string, pattern?: { value: RegExp, message: string } }
}
