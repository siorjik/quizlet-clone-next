'use client'

import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

import { SetType } from '@/types/SetTypes'

type SetContextType = { list: SetType[] | [], data: SetType | {} }

const SetContext = createContext<SetContextType & { setSet: Dispatch<SetStateAction<SetContextType>> }>
  ({ list: [], data: {}, setSet: (): SetContextType => ({ list: [], data: {} }) })

export const SetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [set, setSet] = useState<SetContextType>({ data: {}, list: [] })

  return (
    <SetContext.Provider value={{ ...set, setSet }}>
      {children}
    </SetContext.Provider>
  )
}

export default () => useContext(SetContext)
