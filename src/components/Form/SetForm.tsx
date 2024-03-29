'use client'

import { Fragment, ReactElement, memo, useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray, Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'
import Image from 'next/image'

import Input from '../Input'
import Button from '../Button'

import trashIcon from '@/../public/images/trash.svg'

import { SetType } from '@/types/SetTypes'
import Autocomplete from '../Autocomplete'
import apiService from '@/services/apiService'
import { getApiDictionaryPath, getApiTranslatePath } from '@/utils/paths'

const defaultValues = { list: [{ term: '', definition: '' }], title: '' }

type ActionType = 'edit' | 'create' | null
type DataType = { name: string, words: string[] }

export default memo(function SetForm(
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

  const pairBlock = (index: number): ReactElement => {
    return (
      <div className='flex mt-5 p-5 flex-col w-full justify-between relative bg-lime-200 rounded-xl md:flex-row'>
        <div className='w-full md:w-[47%] flex flex-col'>
          <Autocomplete
            inputProps={{
              name: 'term',
              label: !action ? 'Term' : '',
              placeholder: 'Term...',
              inputStyle: 'set-input',
              blockStyle: 'relative w-full',
              errors: errors?.list?.[index] as Merge<FieldError, FieldErrorsImpl>,
              register: {
                ...register(`list.${index}.term` as const,
                  { required: 'Required!', disabled: !action, onChange: ({ target }) => onChange(target) })
              }
            }}
            data={dictionary.name === `list.${index}.term` ? dictionary.words : []}
            q={getFieldState(`list.${index}.term`).isDirty ? list[index].term : ''}
            setValue={(value: string) => setTranslateQuery(`list.${index}.term`, value)}
            clearData={() => setDictionary({ name: '', words: [] })}
          />
          <span className='mt-1 mx-auto text-xs'>From: English</span>
        </div>

        <div className='w-full md:w-[47%] flex flex-col'>
          <Autocomplete
            inputProps={{
              name: 'definition',
              label: !action ? 'Definition' : '',
              placeholder: isLoading ? 'Translates loading...' : 'Definition...',
              inputStyle: 'set-input',
              blockStyle: 'relative w-full mt-5 md:mt-0',
              errors: errors?.list?.[index] as Merge<FieldError, FieldErrorsImpl>,
              register: {
                ...register(`list.${index}.definition` as const,
                  { required: 'Required!', disabled: !action })
              }
            }}
            data={translate.name === `list.${index}.definition` ? translate.words : []}
            q={getFieldState(`list.${index}.definition`).isDirty ? list[index].definition : ''}
            setValue={(value: string) => setValue(`list.${index}.definition`, value)}
            clearData={() => setTranslate({ name: '', words: [] })}
          />
          <span className='mt-1 mx-auto text-xs'>To: Russian</span>
        </div>
        {action && list.length > 1 &&
          <button type='button' className='mx-auto mt-5 md:m-0 md:mb-5' onClick={() => remove(index)}>
            <Image src={trashIcon} alt='trash' />
          </button>}
      </div>
    )
  }

  return (
    <form className='flex flex-col'>
      <Input
        name='title'
        label={!action ? 'Title' : ''}
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
})
