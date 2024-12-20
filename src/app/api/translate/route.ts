import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import translateAIService from '@/services/translateAIService'
import { ApiErrType } from '@/types/ErrorTypes'

export async function POST(req: NextRequest):
  Promise<NextResponse<string[] | [] | ApiErrType>> {
  try {
    const { word, inputLanguage, outputLanguage } = await req.json()

    return NextResponse.json(word ? await translateAIService(word, inputLanguage!, outputLanguage!) : [])
  } catch (error) {
    const err = error as Error & ApiErrType

    return apiErrorService(err)
  }
}
