import apiService from '@/services/apiService'
import { ApiErrTypes } from '@/types/ErrorTypes'
import { ApiDeleteResponse } from '@/types/ResponseTypes'
import { SetType } from '@/types/SetTypes'
import { getSetApiPath } from '@/utils/paths'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: Request): Promise<NextResponse<SetType | ApiErrTypes>> {
  try {
    const body = await req.json()

    const resp: SetType = await apiService({ url: getSetApiPath(true), method: 'POST', body })

    return NextResponse.json(resp)
  } catch (error) {
    const err = error as ApiErrTypes

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<SetType | SetType[] | ApiErrTypes>> {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    const id = req.nextUrl.searchParams.get('id')

    const url = userId ? `${getSetApiPath(true)}?userId=${userId}` :
      id ? `${getSetApiPath(true)}/${id}` : getSetApiPath(true)

    const res: SetType | SetType[] = await apiService({ url })

    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrTypes

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function PATCH(req: Request): Promise<NextResponse<SetType | ApiErrTypes>> {
  try {
    const body = await req.json()

    const res: SetType = await apiService({ url: `${getSetApiPath(true)}/${body._id}`, method: 'PATCH', body })

    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrTypes

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse<ApiDeleteResponse | ApiErrTypes>> {
  try {
    const id = req.nextUrl.searchParams.get('id')
  
    const res: ApiDeleteResponse = await apiService({ url: `${getSetApiPath(true)}/${id}`, method: 'DELETE' })
  
    return NextResponse.json(res)
  } catch (error) {
    const err = error as ApiErrTypes

    return NextResponse.json({ ...err }, { status: err.statusCode })
  }
}
