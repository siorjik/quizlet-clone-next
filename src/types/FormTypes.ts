import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegisterReturn } from 'react-hook-form'

import { InputTypes } from './InputTypes'

export type FormErrorTypes = FieldErrors<FieldValues> | Merge<FieldError, FieldErrorsImpl>

export type FormRegisterTypes = UseFormRegisterReturn

export type FormInputPropTypes = InputTypes & {
  errors:  FormErrorTypes,
  register: FormRegisterTypes
}
