'use client'

import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Input from '../Input'
import { Fragment } from 'react'
import { InputTypes } from '@/types/InputTypes'

type FormPropsType = {
  submit: (data: { [key: string]: string }) => Promise<void>,
  fieldsData: InputTypes[],
  css: string
}

export default function Form(props: FormPropsType) {
  const { submit, fieldsData, css } = props

  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form className={css} onSubmit={handleSubmit(submit)}>
      {fieldsData.map((item, index) => (
        <Fragment key={index}>
          <Input
            { ...item }
            errors={errors}
            register={{...register(item.name, { required: 'Required!' })}}
          />
        </Fragment>))}
      <Button css='w-fit' type='submit'>Submit</Button>
    </form>
  )
}
