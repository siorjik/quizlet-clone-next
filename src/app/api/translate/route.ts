import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import translateAIService from '@/services/translateAIService'
import { ApiErrType } from '@/types/ErrorTypes'

export async function POST(req: NextRequest):
  Promise<NextResponse<string[] | [] | ApiErrType>> {
  try {
    const { word, inputLanguage, outputLanguage } = await req.json()

    return NextResponse.json(word ? await translateAIService(word, inputLanguage!, outputLanguage!) : [])
    // return NextResponse.json(['1', '1, 2', '1, 2, 3', '1, 2, 3, 4'])
  } catch (error) {
    const err = error as Error & ApiErrType

    return apiErrorService(err)
  }
}
