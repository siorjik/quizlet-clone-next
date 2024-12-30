'use client'

import { Fragment, ReactElement, memo, useEffect, useRef, useState } from 'react'
import { useForm, useFieldArray, Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'
import Image from 'next/image'
import { toast } from 'react-toastify'

import Input from '../Input'
import Button from '../Button'
import Select from '../Select/FormSelect'

import trashIcon from '@/../public/images/trash.svg'

import { SetType } from '@/types/SetTypes'
import Autocomplete from '../Autocomplete'
import apiService from '@/services/apiService'
import { dictionaryApiPath, translateApiPath } from '@/utils/paths'
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
    watch, register, handleSubmit, control, formState: { errors },
    setValue, getFieldState, getValues, setError, clearErrors, trigger
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
        const words: string[] | [] = await apiService({
          url: dictionaryApiPath, method: 'POST', body: { word: value, language: source }
        })

        setDictionary({ name, words })
        setDictionaryLoadingIndex(null)
      } catch (error) {
        console.log(error)
        
        setDictionaryLoadingIndex(null)

        toast('Something went wrong with dictionary', { position: 'bottom-center', type: 'error' })
      }
    }, 800)
  }

  const getTranslates = async (name: string, value: string): Promise<void> => {
    try {
      const words: string[] = await apiService({
        url: translateApiPath, method: 'POST', body: { word: value, inputLanguage: source, outputLanguage: target }
      })

      setTranslate({ name, words })
    } catch (error) {
      console.log(error)

      toast('Something went wrong with translate', { position: 'bottom-center', type: 'error' })
    }
  }

  const setTranslateQuery = async (name: `list.${number}.term`, value: string, index: number): Promise<void> => {
    const definitionName = name.replace('term', 'definition') as `list.${number}.definition`

    try {
      setValue(definitionName, '')
      setValue(name, value)
      setTranslatesLoadingIndex(index)
  
      await getTranslates(definitionName, value)
  
      setTranslatesLoadingIndex(null)
    } catch (error) {
      console.log(error)
    }
  }

  const pairBlock = (index: number): ReactElement => {
    return (
      <div className='flex mt-3 p-5 flex-col w-full justify-between relative bg-lime-200 rounded-xl md:flex-row'>
        <div className='text-center'><p className='pb-3 md:py-3 text-sm'>{index + 1}</p></div>
        <div className='w-full md:w-[47%] flex flex-col relative'>
          {
            dictionaryLoadingIndex === index
            && <span className='absolute text-xs z-10 top-3 right-5 text-slate-400'>Search results...</span>
          }
          <Autocomplete
            inputProps={{
              name: 'term',
              label: !action ? 'Term' : '',
              placeholder: action === 'create' && !source ? 'Choose a language target and source first...' : 'Term',
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
              placeholder: action === 'create' && !target  ? 'Choose a language target and source first...' : 'Definition',
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
          blockStyle='lg:w-2/5'
          errors={errors}
          register={{
            ...register('title', { required: 'Required!', disabled: !action,
              onChange: ({ target }) =>  target.value && errors.title && clearErrors('title')
            })
          }}
          inputRef={inputRef}
        />
        <div 
          className='
            mt-5 lg:mt-0 flex flex-col md:flex-row justify-between w-full
            gap-4 md:gap-10 lg:w-3/6
          '
        >
          <div
            className='
              h-[42px] w-[42px] md:my-0 flex justify-center items-center self-center md:self-end
              cursor-default bg-green-200 rounded-full text-sm
            '
            >
            {list.length}</div>
          <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-10'>
            <div>
              <p className='ml-3 text-xs'>Language source:</p>
              <Select
                style='select text-sm bg-purple-200'
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
                style='select text-sm bg-purple-200'
                name='target'
                options={languageOptions}
                placeholder='Choose a language'
                register={{
                  ...register('target', {
                    required: 'Required!',
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
      </div>
      {fields.map((field, index) => <Fragment key={field.id}>{pairBlock(index)}</Fragment>)}
      {action && <>
        <Button
          type='button'
          bg='lime'
          css='w-fit m-auto mt-3 border-none'
          click={() => {
            if (!getValues('title')) trigger('title')
            else if (!source) trigger('source')
            else if (!target) trigger('target')
            else append({ term: '', definition: '' })
          }}
        >Add</Button>
        <Button size='lg' css='w-fit' type='button' click={handleSubmit(submit)}>{isCreating ? 'Create' : 'Update'}</Button>
      </>}
    </form>
  )
})
