import { renderHook } from '@testing-library/react'
import * as SWR from 'swr'

import useSmartRequest from '@/hooks/useSmartRequest'

describe('useSmartRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  it('should return data', () => {
    jest.spyOn(SWR, 'default').mockImplementation(
      () => ({ data: { test: 100 }, isValidating: false, error: {} as Error, mutate: jest.fn(), isLoading: false })
    )

    const { result } = renderHook(() => useSmartRequest({ entity: 'set', key: 'testKey', url: 'testUrl', requiredProp: 'data' }))
    const { data, isLoading, error, mutate, setContext, mutateData } = result.current

    expect(data).toEqual({ test: 100 })
    expect(isLoading).toBe(false)
    expect(error).toEqual({})
    expect(mutate).toBeDefined()
    expect(setContext).toBeDefined()
    expect(mutateData).toBeDefined()
  })

  it('should return error', () => {
    jest.spyOn(SWR, 'default').mockImplementation(
      () => ({ data: undefined, isValidating: false, error: new Error('testError'), mutate: jest.fn(), isLoading: false })
    )

    const { result } = renderHook(() => useSmartRequest({ entity: 'set', key: 'testKey', url: 'testUrl', requiredProp: 'data' }))
    const { data, isLoading, error, mutate, setContext, mutateData } = result.current

    expect(data).toBeUndefined()
    expect(isLoading).toBe(false)
    expect(error).toEqual(new Error('testError'))
    expect(mutate).toBeDefined()
    expect(setContext).toBeDefined()
    expect(mutateData).toBeDefined()
  })
})
