import { Dispatch, SetStateAction, useEffect } from 'react'
import { KeyedMutator, MutatorOptions, useSWRConfig } from 'swr'

import useSetContext, { SetContextType } from '@/contexts/SetContext'
import useRequest from './useRequest'
import { SetType } from '@/types/SetTypes'

type ParamsTypes = {
  entity: string,
  key: string,
  url: string,
  requiredProp: string
}
type ContextTypes = SetContextType
type MutationDataTypes = SetType

const getContext = (entity: string) => {
  switch (entity) {
    case 'set':
      return useSetContext

    default: return useSetContext
  }
}

export default function useData<T>(params: ParamsTypes): {
  list?: T[], data?: T, isLoading: boolean, error: Error, mutate: KeyedMutator<MutatorOptions>,
  setContext: Dispatch<SetStateAction<ContextTypes>>,
  mutateData: (key: string, contextData: ContextTypes, mutationData: MutationDataTypes | MutationDataTypes[]) => void
} {
  const { entity, key, url, requiredProp } = params

  const { mutate } = useSWRConfig()

  const { data, list, setContext } = getContext(entity)()

  const isDataExist = requiredProp === 'data' && Object.keys(data).length && '_id' in data && key.includes(data._id as string)
  const isListExist = requiredProp === 'list' && list.length
  const isPropExist = isDataExist || isListExist

  const { data: resp, isLoading, error } = useRequest<T>({ key: !isPropExist ? key : null, url })

  useEffect(() => {
    if (resp) setContext({ data, list, [requiredProp]: resp })
  }, [resp])

  const mutateData = (key: string, contextData: ContextTypes, mutationData: MutationDataTypes | MutationDataTypes[]) => {
    setContext({ ...contextData })
    mutate(key, mutationData)
  }

  return { [requiredProp]: isDataExist ? data : isListExist ? list : resp, isLoading, error, mutate, setContext, mutateData }
}
