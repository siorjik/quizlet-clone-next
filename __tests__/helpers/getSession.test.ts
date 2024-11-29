import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

import getSession from '@/helpers/getSession'

describe('getSession', () => {
  it('should return session', async () => {
    const req = {} as NextRequest
    const session = await getSession(req)

    expect(session).toEqual(await getToken({ req }))
  })
})
