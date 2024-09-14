import { NextRequest } from 'next/server'

import getSession from '@/helpers/getSession'

type ObjectType = { [k: string]: string | number | boolean | ObjectType[] }
type RequestParamsType = {
  url: string, method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', body?: ObjectType | undefined,
  req?: null | NextRequest, headers?: null | Headers, cache?: RequestCache | undefined,
}

export default async<T>(
  { url, method = 'GET', cache = 'no-store', body, req = null, headers: heads = null }: RequestParamsType
): Promise<T> => {
  try {
    const headersObj = Object.fromEntries(new Map(heads))
    let headers = heads ? headersObj : {}

    if (req) {
      const { accessToken } = await getSession(req)

      headers = { ...headers, Authorization: `Bearer ${accessToken}` }
    }

    const resp = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...headers }, method, cache, body: JSON.stringify(body)
    })

    const res = await resp.json()
    
    if (res.error || res.statusCode === 401) throw res

    return res
  } catch (error) {
    throw error
  }
}
