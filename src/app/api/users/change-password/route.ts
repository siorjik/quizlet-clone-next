import { NextRequest, NextResponse } from 'next/server'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { getUpdatePasswordApiPath } from '@/utils/paths'
import getSession from '@/helpers/getSession'

export async function PATCH(req: NextRequest): Promise<NextResponse<{ success: boolean } | ApiErrType>> {
  const { _id } = await getSession(req)

  try {
    const body = await req.json()

    const resp: { success: boolean } =
      await apiService<{ success: boolean }>({ url: getUpdatePasswordApiPath(true), method: 'PATCH', body: { ...body, _id }, req })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })
  }
}
