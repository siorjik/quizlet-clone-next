import useSWR, { KeyedMutator } from 'swr'

import apiService from '@/services/apiService'

type ResponseType<T> = {
  data: T | undefined,
  error: Error,
  isLoading: boolean,
  mutate: KeyedMutator<T>
}

export default function useRequest<T>({ key, url }: { key: string | string[] | null, url: string }): ResponseType<T> {
  const { data, error, isLoading, mutate } =
    useSWR(key, async (): Promise<T> => await apiService<T>({ url }), { revalidateOnFocus: false })

  return { data, error, isLoading, mutate }
}
