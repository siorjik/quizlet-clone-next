'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import { SetContextProvider } from './SetContext'
import { AuthContextProvider } from './AuthContext'

const RootContextProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute='class'>
    <SessionProvider>
      <AuthContextProvider>
        <SetContextProvider>
          {children}
        </SetContextProvider>
      </AuthContextProvider>
    </SessionProvider>
  </ThemeProvider>
)

export default RootContextProvider
