import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import dictionaryService from '@/services/dictionaryService'

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | { error: { message: string, status: number } }>> {
  let res: string[] = []

  try {
    const word = req.nextUrl.searchParams.get('word')

    if (word) {
      const { words } = await dictionaryService(word) as { words: string[] }

      res = words.length ? words : [word]
    }

    return NextResponse.json(res)
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
