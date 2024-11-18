'use client'

import { Fragment, ReactElement, memo, useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray, Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'
import Image from 'next/image'

import Input from '../Input'
import Button from '../Button'
import Select from '../Select'

import trashIcon from '@/../public/images/trash.svg'

import { SetType } from '@/types/SetTypes'
import Autocomplete from '../Autocomplete'
import apiService from '@/services/apiService'
import { getApiDictionaryPath, getApiTranslatePath } from '@/utils/paths'
import { languageOptions } from '@/utils/constants'

const defaultValues = { list: [{ term: '', definition: '' }], title: '', source: '', target: '' }

type ActionType = 'edit' | 'create' | null
type DataType = { name: string, words: string[] }

export default memo(function SetForm(
  { data, action = null, func }:
    { data?: SetType, action?: ActionType, func?: (data: SetType) => Promise<void> }
) {
  const [dictionary, setDictionary] = useState<DataType>({ name: '', words: [] })
  const [translate, setTranslate] = useState<DataType>({ name: '', words: [] })
  const [translatesLoadingIndex, setTranslatesLoadingIndex] = useState<null | number>(null)
  const [dictionaryLoadingIndex, setDictionaryLoadingIndex] = useState<null | number>(null)

  const {
    watch, register, handleSubmit, control, formState: { errors }, setValue, getFieldState, getValues, setError, clearErrors
  } = useForm({ defaultValues: data ? { ...data } : { ...defaultValues } })
  const { fields, remove, append } = useFieldArray({ name: 'list', control })

  const inputRef = useRef<HTMLInputElement | null>(null)
  let timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { list, source, target } = watch()

  const isCreating = action === 'create'

  const submit = async (data: SetType): Promise<void> => func && await func(data)

  const onChange = async (target: { name: string, value: string }, index: number): Promise<void> => {
    if (!target.value) return

    clearTimeout(timeoutRef.current as NodeJS.Timeout)

    timeoutRef.current = setTimeout(async () => {
      const { name, value } = target

      setDictionaryLoadingIndex(index)

      try {
        const words: string[] | [] = await apiService({ url: getApiDictionaryPath(value, source) })

        setDictionary({ name, words })
        setDictionaryLoadingIndex(null)
      } catch (error) {
        console.log(error)

        setDictionaryLoadingIndex(null)
      }
    }, 800)
  }

  const getTranslates = async (name: string, value: string): Promise<void> => {
    try {
      const words: string[] = await apiService({ url: getApiTranslatePath(value, source, target) })

      setTranslate({ name, words })
    } catch (error) {
      console.log(error)
    }
  }

  const setTranslateQuery = async (name: `list.${number}.term`, value: string, index: number): Promise<void> => {
    const definitionName = name.replace('term', 'definition') as `list.${number}.definition`

    setValue(definitionName, '')
    setValue(name, value)
    setTranslatesLoadingIndex(index)

    await getTranslates(definitionName, value)

    setTranslatesLoadingIndex(null)
  }

  const pairBlock = (index: number): ReactElement => {
    return (
      <div className='flex mt-5 p-5 flex-col w-full justify-between relative bg-lime-200 rounded-xl md:flex-row'>
        <div className='text-center'><p className='pb-3 md:py-3 text-xs'>{index + 1}</p></div>
        <div className='w-full md:w-[47%] flex flex-col relative'>
          {
            dictionaryLoadingIndex === index
            && <span className='absolute text-xs z-10 top-3 right-5 text-slate-400'>Search results...</span>
          }
          <Autocomplete
            inputProps={{
              name: 'term',
              label: !action ? 'Term' : '',
              placeholder: 'Term',
              inputStyle: 'set-input',
              blockStyle: 'relative w-full',
              errors: errors?.list?.[index] as Merge<FieldError, FieldErrorsImpl>,
              register: {
                ...register(
                  `list.${index}.term` as const,
                  {
                    required: 'Required!', disabled: !action || !source || !target || !!errors.source || !!errors.target,
                    onChange: ({ target }) => onChange(target, index)
                  }
                )
              }
            }}
            data={dictionary.name === `list.${index}.term` ? dictionary.words : []}
            q={getFieldState(`list.${index}.term`).isDirty ? list[index].term : ''}
            setValue={(value: string) => setTranslateQuery(`list.${index}.term`, value, index)}
            clearData={() => setDictionary({ name: '', words: [] })}
          />
          <span className='mt-1 mx-auto text-xs'>
            From: {languageOptions.find(({ value }) => value === getValues('source'))?.label}
          </span>
        </div>

        <div className='w-full md:w-[47%] flex flex-col relative'>
          {
            translatesLoadingIndex === index
            && <span className='absolute text-xs z-10 top-8 right-5 md:top-3 text-slate-400'>Search results...</span>
          }
          <Autocomplete
            inputProps={{
              name: 'definition',
              label: !action ? 'Definition' : '',
              placeholder: 'Definition',
              inputStyle: 'set-input',
              blockStyle: 'relative w-full mt-5 md:mt-0',
              errors: errors?.list?.[index] as Merge<FieldError, FieldErrorsImpl>,
              register: {
                ...register(`list.${index}.definition` as const,
                  { required: 'Required!', disabled: !action || !target || !source || !!errors.source || !!errors.target })
              }
            }}
            data={translate.name === `list.${index}.definition` ? translate.words : []}
            q={getFieldState(`list.${index}.definition`).isDirty ? list[index].definition : ''}
            setValue={(value: string) => setValue(`list.${index}.definition`, value)}
            clearData={() => setTranslate({ name: '', words: [] })}
          />
          <span className='mt-1 mx-auto text-xs'>
            To: {languageOptions.find(({ value }) => value === getValues('target'))?.label}
          </span>
        </div>
        {action && list.length > 1 &&
          <button type='button' className='mx-auto mt-5 md:m-0 md:mb-5' onClick={() => remove(index)}>
            <Image src={trashIcon} alt='trash' />
          </button>}
      </div>
    )
  }

  return (
    <form className='flex flex-col' onKeyDown={(e) => dictionaryLoadingIndex !== null && e.preventDefault()}>
      <div className='flex justify-between flex-col lg:flex-row'>
        <Input
          name='title'
          label={!action ? 'Title' : ''}
          placeholder='Add a title...'
          inputStyle='p-4 text-lg rounded-xl bg-amber-100 w-full'
          blockStyle='mb-3 lg:w-2/5'
          errors={errors}
          register={{ ...register('title', { required: 'Required!', disabled: !action }) }}
          inputRef={inputRef}
        />
        <div className='flex w-full flex-col justify-between gap-5 lg:w-5/12 md:flex-row'>
          <div>
            <p className='ml-3 text-xs'>Language source:</p>
            <Select
              style='select bg-pink-100'
              name='source'
              options={languageOptions}
              placeholder='Choose a language'
              register={{
                ...register('source', {
                  required: 'Required!',
                  onChange: ({ target }) => {
                    if (target.value === target) setError('source', { message: 'Need to be different than target' })
                    else if (errors.source || errors.target) {
                      clearErrors('source')
                      clearErrors('target')
                    }
                  }
                })
              }}
              errors={errors}
              disabled={!!(source && list.length > 1) || !isCreating}
              isRequired
            />
          </div>
          <div>
            <p className='ml-3 text-xs'>Language target:</p>
            <Select
              style='select bg-pink-100'
              name='target'
              options={languageOptions}
              placeholder='Choose a language'
              register={{
                ...register('target', {
                  required: 'Required',
                  onChange: ({ target }) => {
                    if (target.value === source) setError('target', { message: 'Need to be different than source' })
                    else if (errors.source || errors.target) {
                      clearErrors('source')
                      clearErrors('target')
                    }
                  }
                })
              }}
              errors={errors}
              disabled={!!(target && list.length > 1) || !isCreating}
              isRequired
            />
          </div>
        </div>
      </div>
      {fields.map((field, index) => <Fragment key={field.id}>{pairBlock(index)}</Fragment>)}
      {action && <>
        <Button
          type='button'
          css='btn w-fit m-auto mt-5 border-none bg-lime-300 hover:bg-lime-100'
          click={() => append({ term: '', definition: '' })}
        >Add</Button>
        <Button css='btn w-fit mt-4' type='button' click={handleSubmit(submit)}>{isCreating ? 'Create' : 'Update'}</Button>
      </>}
    </form>
  )
})
