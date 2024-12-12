import { ReactNode } from 'react'

export type ButtonTypes = {
  bg?: string, size?: 'sm' | 'md' | 'lg', children: ReactNode,
  type?: 'button' | 'submit', css?: string, click?: () => void, isDisabled?: boolean
}
