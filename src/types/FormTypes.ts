import { FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge, UseFormRegisterReturn } from 'react-hook-form'

import { InputType } from './InputTypes'
import { SelectType } from './SelectTypes'

export type FormErrorType = FieldErrors<FieldValues> | Merge<FieldError, FieldErrorsImpl>

export type FormInputPropType = InputType & {
  errors:  FormErrorType,
  register: UseFormRegisterReturn
}

export type FormSelectPropType = SelectType & {
  errors:  FormErrorType,
  register: UseFormRegisterReturn
}
