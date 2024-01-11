'use client'

import { SessionProvider } from 'next-auth/react'

import { SetContextProvider } from './SetContext'

const RootContextProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <SetContextProvider>
      {children}
    </SetContextProvider>
  </SessionProvider>
)

export default RootContextProvider
