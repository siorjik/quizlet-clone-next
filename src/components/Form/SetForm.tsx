'use client'

import { Fragment, ReactElement, useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray, Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'

import Input from '../Input'
import Button from '../Button'

import trashIcon from '@/../public/trash.svg'
import Image from 'next/image'
import { SetType } from '@/types/SetTypes'
import Autocomplete from '../Autocomplete'
import apiService from '@/services/apiService'
import { getApiDictionaryPath, getApiTranslatePath } from '@/utils/paths'

const defaultValues = { list: [{ term: '', definition: '' }], title: '' }

type ActionType = 'edit' | 'create' | null
type DataType = { name: string, words: string[] }

export default function SetForm(
  { data, action = null, func }:
    { data?: SetType, action?: ActionType, func?: (data: SetType) => Promise<void> }
) {
  const [dictionary, setDictionary] = useState<DataType>({ name: '', words: [] })
  const [translate, setTranslate] = useState<DataType>({ name: '', words: [] })
  const [isLoading, setLoading] = useState(false)

  const { watch, register, handleSubmit, control, formState: { errors }, setValue, getFieldState } = useForm({
    defaultValues: data ? { ...data } : { ...defaultValues }
  })
  const { fields, remove, append } = useFieldArray({ name: 'list', control })

  const inputRef = useRef<HTMLInputElement | null>(null)
  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { list } = watch()

  const isCreating = action === 'create'

  const submit = async (data: SetType): Promise<void> => func && await func(data)

  const onChange = async (target: { name: string, value: string }): Promise<void> => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout)

    timeoutRef.current = setTimeout(async () => {
      const { name, value } = target

      try {
        const words: string[] | [] = await apiService({ url: getApiDictionaryPath(value) })

        setDictionary({ name, words })
      } catch (error) {
        console.log(error)
      }
    }, 500)
  }

  const getTranslates = async (name: string, value: string): Promise<void> => {
    try {
      const words: string[] = await apiService({ url: getApiTranslatePath(value) })

      setTranslate({ name, words })
    } catch (error) {
      console.log(error)
    }
  }

  const setTranslateQuery = async (name: `list.${number}.term`, value: string): Promise<void> => {
    const definitionName = name.replace('term', 'definition') as `list.${number}.definition`

    setValue(definitionName, '')
    setValue(name, value)
    setLoading(true)

    await getTranslates(definitionName, value)

    setLoading(false)
  }

  const pairBlock = (number: number): ReactElement => {
    return (
      <div className='flex mt-5 p-5 flex-col w-full justify-between relative bg-lime-200 rounded-xl md:flex-row'>
        <Autocomplete
          inputProps={{
            name: 'term',
            placeholder: 'Term...',
            inputStyle: 'set-input',
            blockStyle: 'relative w-full md:w-[47%]',
            errors: errors?.list?.[number] as Merge<FieldError, FieldErrorsImpl>,
            register: {
              ...register(`list.${number}.term` as const,
                { required: 'Required!', disabled: !action, onChange: ({ target }) => onChange(target) })
            }
          }}
          data={dictionary.name === `list.${number}.term` ? dictionary.words : []}
          q={getFieldState(`list.${number}.term`).isDirty ? list[number].term : ''}
          setValue={(value: string) => setTranslateQuery(`list.${number}.term`, value)}
        />
        
        <Autocomplete
          inputProps={{
            name: 'definition',
            placeholder: isLoading ? 'Translates loading...' : 'Definition...',
            inputStyle: 'set-input',
            blockStyle: 'relative w-full mt-5 md:w-[47%] md:mt-0',
            errors: errors?.list?.[number] as Merge<FieldError, FieldErrorsImpl>,
            register: {
              ...register(`list.${number}.definition` as const,
                { required: 'Required!', disabled: !action })
            }
          }}
          data={translate.name === `list.${number}.definition` ? translate.words : []}
          q={getFieldState(`list.${number}.definition`).isDirty ? list[number].definition : ''}
          setValue={(value: string) => setValue(`list.${number}.definition`, value)}
        />
        {action && list.length > 1 && <button type='button' className='mx-auto mt-5 md:m-0' onClick={() => remove(number)}>
          <Image src={trashIcon} alt='trash' />
        </button>}
      </div>
    )
  }

  return (
    <form className='flex flex-col'>
      <Input
        name='title'
        placeholder='Add a title...'
        inputStyle='p-4 text-lg rounded-xl bg-amber-100 w-full md:w-1/2'
        blockStyle='mb-3'
        errors={errors}
        register={{ ...register('title', { required: 'Required!', disabled: !action }) }}
        inputRef={inputRef}
      />
      {fields.map((field, index) => <Fragment key={field.id}>{pairBlock(index)}</Fragment>)}
      {action && <>
        <Button
          type='button'
          css='w-fit m-auto mt-5 border-none bg-lime-300 hover:bg-lime-100'
          click={() => append({ term: '', definition: '' })}
        >Add</Button>
        <Button css='w-fit mt-4' type='button' click={handleSubmit(submit)}>{isCreating ? 'Create' : 'Update'}</Button>
      </>}
    </form>
  )
}
