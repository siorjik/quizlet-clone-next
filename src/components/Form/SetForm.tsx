'use client'

import { Fragment, ReactElement, useEffect, useRef } from 'react'
import { useForm, useFieldArray, Merge, FieldError, FieldErrorsImpl } from 'react-hook-form'

import Input from '../Input'
import Button from '../Button'

import trashIcon from '@/../public/trash.svg'
import Image from 'next/image'
import { SetType } from '@/types/SetTypes'
import Autocomplete from '../Autocomplete'

const defaultValues = { list: [{ term: '', definition: '' }], title: '' }

type ActionType = 'edit' | 'create' | null

export default function SetForm(
  { data, action = null, func }:
    { data?: SetType, action?: ActionType, func?: (data: SetType) => Promise<void> }
) {
  const { watch, register, handleSubmit, control, formState: { errors }, setValue, getFieldState } = useForm({
    defaultValues: data ? { ...data } : { ...defaultValues }
  })
  const { fields, remove, append } = useFieldArray({ name: 'list', control })

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { list } = watch()

  const isCreating = action === 'create'

  const submit = async (data: SetType): Promise<void> => func && await func(data)

  const pairBlock = (number: number): ReactElement => (
    <div className='flex mt-5 p-5 flex-col w-full justify-between relative bg-lime-200 rounded-xl md:flex-row'>
      <div className='relative w-full md:w-[47%]'>
        <Autocomplete
          inputProps={{
            name: 'term',
            inputStyle: 'set-input',
            errors: errors?.list?.[number] as Merge<FieldError, FieldErrorsImpl>,
            register: { ...register(`list.${number}.term` as const, { required: 'Required!', disabled: !action }) }
          }}
          data={['facebook', 'liface', 'red']}
          q={getFieldState(`list.${number}.term`).isDirty ? list[number].term : ''}
          setValue={(value: string) => setValue(`list.${number}.term`, value)}
        />
      </div>
      <div className='relative w-full mt-5 md:w-[47%] md:mt-0'>
        <Autocomplete
          inputProps={{
            name: 'definition',
            inputStyle: 'set-input',
            errors: errors?.list?.[number] as Merge<FieldError, FieldErrorsImpl>,
            register: { ...register(`list.${number}.definition` as const, { required: 'Required!', disabled: !action }) }
          }}
          data={['bebe', 'back', 'bed', 'find']}
          q={getFieldState(`list.${number}.definition`).isDirty ? list[number].definition : ''}
          setValue={(value: string) => setValue(`list.${number}.definition`, value)}
        />
      </div>
      {action && list.length > 1 && <button type='button' className='mx-auto mt-5 md:m-0' onClick={() => remove(number)}>
        <Image src={trashIcon} alt='trash' />
      </button>}
    </div>
  )

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
          css='w-fit m-auto mt-5 border-none bg-lime-300'
          click={() => append({ term: '', definition: '' })}
        >Add</Button>
        <Button css='w-fit mt-4' type='button' click={handleSubmit(submit)}>{isCreating ? 'Create' : 'Update'}</Button>
      </>}
    </form>
  )
}
