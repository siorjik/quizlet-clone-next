import useSWR, { KeyedMutator } from 'swr'

import apiService from '@/services/apiService'

type ObjType = { [k: string]: string | number | boolean }
type RequestType = {
  error: Error,
  isLoading: boolean,
  mutate: KeyedMutator<ObjType>
}

export default function useRequest<T>({ key, url }: { key: string | string[] | null, url: string }): { data: T } & RequestType {
  const { data, error, isLoading, mutate } =
    useSWR(key, async (): Promise<any> => await apiService<T>({ url }), { revalidateOnFocus: false })

  return { data, error, isLoading, mutate }
}
