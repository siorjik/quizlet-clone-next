import { NextRequest } from 'next/server'

import getSession from '@/helpers/getSession'

type ObjectType = { [k: string]: string | number | boolean | ObjectType[] }

export default async<T>(
  { url, method = 'GET', cache = 'no-store', body, req = null }:
    {
      url: string,
      method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH',
      cache?: RequestCache | undefined,
      body?: ObjectType | undefined,
      req?: null | NextRequest
    }
): Promise<T> => {
  try {
    let headers = {}

    if (req) {
      const { accessToken } = await getSession(req)

      headers = { ...headers, Authorization: `Bearer ${accessToken}` }
    }

    const resp = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...headers },
      method,
      cache,
      body: JSON.stringify(body)
    })

    const res = await resp.json()
    
    if (res.error || res.statusCode === 401) throw res

    return res
  } catch (error) {
    throw error
  }
}
