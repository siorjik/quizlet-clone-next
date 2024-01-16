'use client'

import { Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { createContext, useEffect, useRef } from 'react'

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)

  const { data, update } = useSession()

  const sessionData = data as Session & { accessExpire: string }
  const expirationDate = sessionData?.accessExpire as string

  useEffect(() => {
    if (expirationDate) (async () => await updateTokens())()

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout)
  }, [expirationDate])

  const updateTokens = async (): Promise<void> => {
    const updatingInterval = expirationDate ? +new Date(expirationDate) - +new Date() - 30000 : 10000

    timeoutRef.current = setTimeout(async () => {
      const resp = await fetch('/api/auth/session?update=true')
      const res: Session = await resp.json()

      if (res.user) update()
      else {
        clearTimeout(timeoutRef.current as NodeJS.Timeout)

        signOut()
      }
    }, updatingInterval)
  }

  return (
    <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
  )
}
