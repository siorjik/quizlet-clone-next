type ObjectType = { [k:string]: string | number | boolean }
type ArrObjectType = { [k:string]: string | number | boolean | ObjectType[] }
type BodyType = ObjectType | ArrObjectType

export default async(
  { url, method, cache = 'no-store', body }:
  {
    url: string,
    method: 'post' | 'get' | 'put' | 'delete',
    cache?: RequestCache | undefined,
    body?: BodyType | undefined
  }
) => {
  try {
    const resp = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      cache,
      body: JSON.stringify(body)
    })

    const res = await resp.json()

    if (res.error) throw res.error

    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}
