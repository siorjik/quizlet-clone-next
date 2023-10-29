type ObjectType = { [k: string]: string | number | boolean }
type ArrObjectType = { [k: string]: string | number | boolean | ObjectType[] }
type BodyType = ObjectType | ArrObjectType

export default async<T>(
  { url, method = 'GET', cache = 'no-store', body }:
    {
      url: string,
      method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH',
      cache?: RequestCache | undefined,
      body?: BodyType | undefined
    }
): Promise<T> => {
  try {
    const resp = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      cache,
      body: JSON.stringify(body)
    })

    const res = await resp.json()

    if (res.error) throw res

    return res
  } catch (error) {
    throw error
  }
}
