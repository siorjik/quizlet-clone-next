import useSWR, { KeyedMutator } from 'swr'

import apiService from '@/services/apiService'

type ObjType = { [k: string]: string | number | boolean }
type RequestType = {
  error: Error,
  isLoading: boolean,
  mutate: KeyedMutator<ObjType>
}

export default function useRequest<T>(
  { key, url, body, method = 'GET' }:
    { key: string | string[], url: string, body?: ObjType, method?: 'POST' | 'GET' | 'PUT' | 'PATCH' }
): { data: T } & RequestType {
  const { data, error, isLoading, mutate } =
    useSWR(key, async (): Promise<any> => await apiService<T>({ url, body, method }), { revalidateOnFocus: false })

  return { data, error, isLoading, mutate }
}
