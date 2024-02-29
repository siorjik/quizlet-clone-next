'use client'

import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Input from '../Input'
import { InputType } from '@/types/InputTypes'

type FormPropsType = {
  submit: (data: { [key: string]: string }) => Promise<void>,
  fieldsData: InputType[],
  css: string,
  btnData?: {
    hoverColor?: string,
    text: string,
  },
  isReset?: boolean,
}

export default function Form(props: FormPropsType) {
  const { submit, fieldsData, css, btnData: { text, hoverColor } = {}, isReset = false } = props

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data: { [key: string]: string }) => {
    try {
      await submit(data)
      if (isReset) reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={css} onSubmit={handleSubmit(onSubmit)}>
      {fieldsData.map((item, index) => (
        <Fragment key={index}>
          <Input
            { ...item }
            errors={errors}
            register={{...register(item.name, { ...item.validation })}}
          />
        </Fragment>))}
      <Button css='w-fit' type='submit' hoverColor={hoverColor}>{text || 'Submit'}</Button>
    </form>
  )
}
