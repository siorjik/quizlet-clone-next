import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import dictionaryAIService from '@/services/dictionaryAIService'
import dictionaryService from '@/services/dictionaryService'
import { ApiErrType } from '@/types/ErrorTypes'

type LanguageType = 'en' | 'ru' | 'ua'

export async function POST(req: NextRequest):
  Promise<NextResponse<string[] | ApiErrType>> {
  let res: string[] = []
  let resp: { words: string[] } = { words: [] }

  try {
    const { word, language } = await req.json() as { word: string, language: LanguageType }

    if (word) {
      if (language !== 'en') resp = await dictionaryAIService(word, language!)
      else resp = await dictionaryService(word)

      res = resp.words.length ? resp.words : [word]
    }

    return NextResponse.json(res)
  } catch (error) {
    const err = error as Error & ApiErrType

    return apiErrorService(err)
  }
}
