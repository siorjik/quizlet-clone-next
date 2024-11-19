'use client'

import { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z, { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/Button'
import Input from '../Input'
import { InputType } from '@/types/InputTypes'

type FormPropsType = {
  submit: (data: z.infer<ZodSchema>) => Promise<void>,
  fieldsData: InputType[],
  css: string,
  btnData?: {
    hoverColor?: string,
    text: string,
  },
  isReset?: boolean,
  onSuccess?: () => void,
  schema: ZodSchema
  isDisabled?: boolean
  data?: z.infer<ZodSchema>
  isErr?: boolean
}

export default function Form(props: FormPropsType) {
  const {
    submit, fieldsData, css, btnData: { text, hoverColor } = {}, isReset = false, schema, onSuccess, isDisabled = false,
    data = null, isErr = false
  } = props

  const {
    register, handleSubmit, reset, formState: { errors, isSubmitted, dirtyFields }, getValues
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: data
  })

  useEffect(() => {
    if (isDisabled && !isSubmitted) reset()
  }, [isDisabled])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await submit(data)

      if (isReset) reset()
      if (onSuccess) onSuccess()

      reset({ ...getValues(), dirtyFields: {} })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={css} onSubmit={handleSubmit(onSubmit)}>
      {fieldsData.map((item, index) => (
        <Fragment key={index}>
          <Input { ...item } errors={errors} register={{...register(item.name), disabled: isDisabled}} />
        </Fragment>))}
      {
        ((!isDisabled && Object.keys(dirtyFields).length > 0) || isErr)
        && <Button css='btn mt-8 w-fit' type='submit' hoverColor={hoverColor}>{text || 'Submit'}</Button>
      }
    </form>
  )
}
