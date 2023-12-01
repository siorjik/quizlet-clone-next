'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type ViewContextType = { viewSize: number, isMobile: boolean | undefined }

const ViewContext = createContext<ViewContextType>({ viewSize: 0, isMobile: false })

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [context, setContext] = useState<ViewContextType>({ viewSize: 0, isMobile: undefined })

  useEffect(() => {
    setContext({ ...context, viewSize: window.innerWidth, isMobile: window.innerWidth < 768 })

    window.addEventListener('resize', () => setViewSize(window))
  }, [])

  const setViewSize = (window: Window) =>
    setContext({ ...context, viewSize: window.innerWidth, isMobile: window.innerWidth < 768 })

  return (
    <ViewContext.Provider value={{ ...context }}>
      {children}
    </ViewContext.Provider>
  )
}

export default () => useContext(ViewContext)
