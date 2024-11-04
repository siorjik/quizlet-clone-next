import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import translateService from '@/services/translateService'

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | [] | { error: { message: string, status: number } }>> {
  try {
    const word = req.nextUrl.searchParams.get('word')

    return NextResponse.json(word ? await translateService(word) : [])
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
