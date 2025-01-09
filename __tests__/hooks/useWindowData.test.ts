import { renderHook } from '@testing-library/react'

import useWindowData from '@/hooks/useWindowData'

describe('useWindowData', () => {
  it('should return viewSize and isMobile', () => {
    const { result } = renderHook(() => useWindowData())
    const { viewSize, isMobile } = result.current

    expect(viewSize).toBeDefined()
    expect(viewSize === window.innerWidth).toBe(true)

    expect(isMobile).toBeDefined()
    expect(isMobile === window.innerWidth < 768).toBe(true)
  })
})
