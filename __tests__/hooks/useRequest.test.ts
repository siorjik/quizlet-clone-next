import { renderHook } from '@testing-library/react'
import * as SWR from 'swr'

import useRequest from '@/hooks/useRequest'

describe('useRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return data', () => {
    jest.spyOn(SWR, 'default').mockImplementation(
      () => ({ data: { test: 100 }, isValidating: false, error: {} as Error, mutate: jest.fn(), isLoading: false })
    )

    const { result } = renderHook(() => useRequest({ key: 'testKey', url: 'testUrl' }))
    let { data, error, isLoading, mutate } = result.current

    expect(SWR.default).toHaveBeenCalledTimes(1)
    expect(data).toEqual({ test: 100 })
    expect(error).toEqual({})
    expect(isLoading).toBe(false)
    expect(mutate).toBeDefined()
  })

  it('should return error', () => {
    jest.spyOn(SWR, 'default').mockImplementation(
      () => ({ data: undefined, isValidating: false, error: new Error('testError'), mutate: jest.fn(), isLoading: false })
    )

    const { result } = renderHook(() => useRequest({ key: 'testKey', url: 'testUrl' }))
    let { data, error, isLoading, mutate } = result.current

    expect(SWR.default).toHaveBeenCalledTimes(1)
    expect(data).toBeUndefined()
    expect(error).toEqual(new Error('testError'))
    expect(isLoading).toBe(false)
    expect(mutate).toBeDefined()
  })
})
