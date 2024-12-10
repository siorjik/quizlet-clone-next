import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import dictionaryService from '@/services/dictionaryService'
import { ApiErrType } from '@/types/ErrorTypes'

export async function POST(req: NextRequest):
  Promise<NextResponse<string[] | ApiErrType>> {
  let res: string[] = []

  try {
    const { word, language } = await req.json()

    if (word) {
      const { words } = await dictionaryService(word, language!) as { words: string[] }

      res = words.length ? words : [word]
    }

    return NextResponse.json(res)
  } catch (error) {
    const err = error as Error & ApiErrType

    return apiErrorService(err)
  }
}
