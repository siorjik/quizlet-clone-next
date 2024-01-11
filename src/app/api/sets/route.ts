import { NextRequest, NextResponse } from 'next/server'

import getSession from '@/helpers/getSession'
import apiService from '@/services/apiService'
import { ApiErrType } from '@/types/ErrorTypes'
import { ApiDeleteResponse } from '@/types/ResponseTypes'
import { SetType } from '@/types/SetTypes'
import { getSetApiPath } from '@/utils/paths'

export async function POST(req: NextRequest): Promise<NextResponse<SetType | ApiErrType>> {
  const { _id: userId } = await getSession(req)

  try {
    const body = await req.json()

    const resp: SetType = await apiService({ url: getSetApiPath(true), method: 'POST', body: { ...body, userId  } })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<SetType | SetType[] | ApiErrType>> {
  const { _id } = await getSession(req)
  
  try {
    const id = req.nextUrl.searchParams.get('id')

    const url = id ? `${getSetApiPath(true)}/${id}` : `${getSetApiPath(true)}?userId=${_id}`

    const res: SetType | SetType[] = await apiService({ url })

    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function PATCH(req: Request): Promise<NextResponse<SetType | ApiErrType>> {
  try {
    const body = await req.json()

    const res: SetType = await apiService({ url: getSetApiPath(true), method: 'PATCH', body })

    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiDeleteResponse | ApiErrType>> {
  try {
    const id = req.nextUrl.searchParams.get('id')
  
    const res: ApiDeleteResponse = await apiService({ url: `${getSetApiPath(true)}/${id}`, method: 'DELETE' })
  
    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}
