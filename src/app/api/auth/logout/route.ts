import { NextRequest, NextResponse } from 'next/server'

import getSession from '@/helpers/getSession'
import { ApiErrType } from '@/types/ErrorTypes'
import apiService from '@/services/apiService'
import { getLogoutApiPath } from '@/utils/paths'

export async function GET(req: NextRequest): Promise<NextResponse<boolean | ApiErrType>> {
  const { refreshToken } = await getSession(req)

  try {
    await apiService({ url: `${getLogoutApiPath(true)}?refresh=${refreshToken}`, req })
    
    return NextResponse.json(true)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}
