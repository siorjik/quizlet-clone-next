import { NextRequest, NextResponse } from 'next/server'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { UserType } from '@/types/UserTypes'
import { getCreatePasswordApiPath } from '@/utils/paths'
import apiErrorService from '@/services/apiErrorService'

export async function POST(req: NextRequest): Promise<NextResponse<UserType | ApiErrType>> {
  try {
    const body = await req.json()

    const resp: UserType = await apiService<UserType>({ url: getCreatePasswordApiPath(true), method: 'POST', body })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType & Error

    return apiErrorService(err)
  }
}
