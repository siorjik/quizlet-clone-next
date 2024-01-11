import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'

type DictionaryType = { word: string, score: number }[]

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | { error: { message: string, status: number } }>> {
  let res: string[] = []

  try {
    const word = req.nextUrl.searchParams.get('word')

    if (word) {
      const resp = await fetch(`${process.env.DICTIONARY_API_URL}?sp=${word}??`)
      const words: DictionaryType = await resp.json()

      res = !!words.length ? words.splice(0, 3).map(item => item.word) : [word]
    }

    return NextResponse.json(res)
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
