import { renderHook } from '@testing-library/react'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

import useFileStorage from '@/hooks/useFileStorage'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: { fileStorageAuth: 'testFileStorageAuth' } })),
}))

describe('useFileStorage', () => {
  it('should return getAuthUrl with auth url', async() => {
    const { result } = renderHook(() => useFileStorage())
    const { getAuthUrl } = result.current
    const { data: session } = useSession()

    const sessionData = session as Session & { fileStorageAuth: string }
    const { fileStorageAuth } = sessionData

    expect(fileStorageAuth).toBe('testFileStorageAuth')
    expect(getAuthUrl).toBeDefined()
    expect(getAuthUrl('testUrl')).toBe('testUrl?Authorization=testFileStorageAuth')
  })
})
