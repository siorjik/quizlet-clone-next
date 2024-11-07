import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import translateService from '@/services/translateService'

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | [] | { error: { message: string, status: number } }>> {
  try {
    const word = req.nextUrl.searchParams.get('word')
    const inputLanguage = req.nextUrl.searchParams.get('inputLanguage')
    const outputLanguage = req.nextUrl.searchParams.get('outputLanguage')

    return NextResponse.json(word ? await translateService(word, inputLanguage!, outputLanguage!) : [])
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
