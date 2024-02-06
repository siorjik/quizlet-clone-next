import apiErrorService from '@/services/apiErrorService'
import { NextRequest, NextResponse } from 'next/server'

const getUniqueString = (arr: string[]): string => {
  const resArr = arr.map(item => item.split(', ')).flat()

  return Array.from(new Set(resArr)).join(', ')
}

const getMappedTranslates = (data: string[]): string[] => {
  let res: string[] = [data[0]]
  let index = 1

  while (index < data.length) {
    res = [...res, data[index], getUniqueString([...res, data[index]])]

    index += 1
  }

  return res
}

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | [] | { error: { message: string, status: number } }>> {
  try {
    const word = req.nextUrl.searchParams.get('word')

    const translates = await fetch(process.env.TRANSLATE_API_URL as string, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.TRANSLATE_API_KEY as string,
        'X-RapidAPI-Host': process.env.TRANSLATE_API_HOST as string
      },
      body: JSON.stringify({
        text: word,
        source: 'EN',
        target: 'RU',
      })
    })
    const res: { text: string, alternative_texts: string[] } = await translates.json()
    
    return NextResponse.json(word && res.text ? getMappedTranslates([res.text, ...res.alternative_texts]) : [])
  } catch (error) {
    const err = error as Error

    return apiErrorService(err, 400)
  }
}
