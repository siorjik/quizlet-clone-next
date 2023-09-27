import useSWR, { KeyedMutator } from 'swr'

import apiService from '@/services/apiService'

type ObjType = { [k: string]: string | number | boolean }
type RequestType = {
  error: Error,
  isLoading: boolean,
  mutate: KeyedMutator<ObjType>
}

export default function useRequest<T>(
  { key, url, body, method = 'get' }:
  { key: string | string[], url: string, body?: ObjType, method?: 'post' | 'get' | 'put' }
): { data: T } & RequestType {
  const { data, error, isLoading, mutate } = useSWR(key, () => apiService({ url, body, method }), { revalidateOnFocus: false })

  return { data, error, isLoading, mutate }
}
