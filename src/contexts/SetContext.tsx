'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

import { SetType } from '@/types/SetTypes'

export type SetContextType = { list: SetType[] | [], data: SetType | {} }

const SetContext = createContext<SetContextType & { setContext: Dispatch<SetStateAction<SetContextType>> }>
  ({ list: [], data: {}, setContext: (): SetContextType => ({ list: [], data: {} }) })

export const SetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<SetContextType>({ data: {}, list: [] })

  return (
    <SetContext.Provider value={{ ...context, setContext }}>
      {children}
    </SetContext.Provider>
  )
}

export default () => useContext(SetContext)
