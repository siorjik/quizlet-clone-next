import { NextRequest, NextResponse } from 'next/server'

import apiErrorService from '@/services/apiErrorService'
import translateService from '@/services/translateService'

const getUniqueString = (arr: string[]): string => {
  const resArr = arr.map(item => item.split(', ')).flat()

  return Array.from(new Set(resArr)).join(', ')
}

const getMappedTranslates = (data: string[]): string[] => {
  let res: string[] = []
  let index = 0

  while (index < data.length) {
    res = [...res, getUniqueString([...res, data[index]])]

    index += 1
  }

  return res
}

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | [] | { error: { message: string, status: number } }>> {
  try {
    const word = req.nextUrl.searchParams.get('word')

    const res: { translate: string, translates: string[] } = await translateService(word as string)

    return NextResponse.json(word && res.translate ? getMappedTranslates([...res.translates]) : [])
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
