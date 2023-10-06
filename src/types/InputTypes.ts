import { MutableRefObject } from 'react'

export type InputTypes = {
  name: string,
  type?: string,
  blockStyle?: string,
  inputStyle: string,
  placeholder?: string,
  inputRef?: MutableRefObject<HTMLInputElement | null>
}
