import { useEffect, useState } from 'react'

type WindowDataType = { viewSize: number, isMobile: boolean | undefined }

export default function useWindowData() {
  const [windowData, setWindowData] = useState<WindowDataType>({ viewSize: 0, isMobile: undefined })

  useEffect(() => {
    setViewSize(window)

    window.addEventListener('resize', () => setViewSize(window))

    return () => {
      window.removeEventListener('resize', () => setViewSize(window))
    }
  }, [])

  const setViewSize = (window: Window) =>
    setWindowData({ ...windowData, viewSize: window.innerWidth, isMobile: window.innerWidth < 768 })

  return { ...windowData }
}
