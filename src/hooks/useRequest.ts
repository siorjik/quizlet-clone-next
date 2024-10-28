import useSWR, { KeyedMutator } from 'swr'

import apiService from '@/services/apiService'

type ResponseType<T> = {
  data: T | undefined,
  error: Error,
  isLoading: boolean,
  mutate: KeyedMutator<T | undefined>
}

export default function useRequest<T>({ key, url }: { key: string | string[] | null, url: string  | null }): ResponseType<T> {
  const { data, error, isLoading, mutate } =
    useSWR(key, async (): Promise<T | undefined> => url ? await apiService<T>({ url }) : undefined, { revalidateOnFocus: false })

  return { data, error, isLoading, mutate }
}
