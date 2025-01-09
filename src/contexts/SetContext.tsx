'use client'

import { createContext, useContext, useState } from 'react'

import { SetType } from '@/types/SetTypes'

export type SetContextStateType = { list: SetType[], data: SetType }
export type SetContextType = SetType[] | SetType | {} | []
export type SetContextUpdateData = { [k: string]: SetContextType } | SetContextStateType

export const SetContext = createContext<SetContextStateType & { setContext: (data: { [k: string]: SetContextType }) => void }>
({ list: [], data: {} as SetType, setContext: (): void => { } })

export const SetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [set, setSet] = useState<SetContextStateType>({ data: {} as SetType, list: [] })

  const setContext = (data: SetContextUpdateData) => setSet({ ...set, ...data })

  return (
    <SetContext.Provider value={{ ...set, setContext }}>
      {children}
    </SetContext.Provider>
  )
}

export default () => useContext(SetContext)
