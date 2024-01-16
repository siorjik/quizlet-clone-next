'use client'

import { SessionProvider } from 'next-auth/react'

import { SetContextProvider } from './SetContext'
import { AuthContextProvider } from './AuthContext'

const RootContextProvider = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <AuthContextProvider>
      <SetContextProvider>
        {children}
      </SetContextProvider>
    </AuthContextProvider>
  </SessionProvider>
)

export default RootContextProvider
