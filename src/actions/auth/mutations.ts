'use server'

import { createPassActionTypeSchema, registerFormTypeSchema } from '@/types/forms/auth'
import { actionClient } from '../actionClient'
import apiService from '@/services/apiService'
import { UserType } from '@/types/UserTypes'
import { getCreatePasswordApiPath, getUserApiPath, homeAppPath } from '@/utils/paths'
import { revalidatePath } from 'next/cache'
import { ApiErrType } from '@/types/ErrorTypes'
import getApiErrMessage from '@/helpers/getApiErrMessage'

export const createUser = actionClient
  .schema(registerFormTypeSchema)
  .action(async ({ parsedInput }) => {
    const { name, email } = parsedInput
    let createdUser

    try {
      createdUser = await apiService<UserType>({ url: getUserApiPath(), body: { name, email }, method: 'POST' })
    } catch (error) {
      const err = error as ApiErrType

      throw new Error(getApiErrMessage(err))
    }

    revalidatePath(homeAppPath)

    return { success: true, createdUser }
  })

export const createPassword = actionClient
  .schema(createPassActionTypeSchema)
  .action(async ({ parsedInput }) => {
    const { password, token } = parsedInput

    try {
      await apiService({ url: getCreatePasswordApiPath(), body: { password, token }, method: 'POST' })
    } catch (error) {
      const err = error as ApiErrType

      throw new Error(getApiErrMessage(err))
    }

    return { success: true }
  })
