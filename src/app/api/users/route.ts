import { NextRequest, NextResponse } from 'next/server'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { UserType } from '@/types/UserTypes'
import { getUserApiPath } from '@/utils/paths'
import getSession from '@/helpers/getSession'

export async function POST(req: NextRequest): Promise<NextResponse<UserType | ApiErrType>> {
  try {
    const body = await req.json()

    const resp: UserType = await apiService<UserType>({ url: getUserApiPath(true), method: 'POST', body })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })
  }
}

export async function PATCH(req: NextRequest): Promise<NextResponse<UserType | ApiErrType>> {
  const { _id } = await getSession(req)

  try {
    const body = await req.json()

    const resp: UserType = await apiService<UserType>({ url: getUserApiPath(true), method: 'PATCH', body: { ...body, _id }, req })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })
  }
}
