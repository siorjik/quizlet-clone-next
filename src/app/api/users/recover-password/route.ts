import { NextRequest, NextResponse } from 'next/server'

import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { getRecoveryPasswordApiPath } from '@/utils/paths'

export async function POST(req: NextRequest): Promise<NextResponse<{ success: boolean } | ApiErrType>> {
  try {
    const body = await req.json()

    const resp: { success: boolean } =
      await apiService<{ success: boolean }>({ url: getRecoveryPasswordApiPath(true), method: 'POST', body })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })
  }
}
