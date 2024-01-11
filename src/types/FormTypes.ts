import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegisterReturn } from 'react-hook-form'

import { InputType } from './InputTypes'

export type FormErrorType = FieldErrors<FieldValues> | Merge<FieldError, FieldErrorsImpl>

export type FormInputPropType = InputType & {
  errors:  FormErrorType,
  register: UseFormRegisterReturn
}
