import { MutableRefObject } from 'react'

export type InputTypes = {
  name: string,
  label?: string,
  type?: string,
  blockStyle?: string,
  inputStyle: string,
  placeholder?: string,
  inputRef?: MutableRefObject<HTMLInputElement | null>
}
