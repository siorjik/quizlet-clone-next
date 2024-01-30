import apiErrorService from '@/services/apiErrorService'
import { NextRequest, NextResponse } from 'next/server'

const getMappedTranslates = (data: string[]): string[] => {
  let res: string[] = []

  data.forEach((item, index) => {
    if (data.length === 2) res = [...data, data.join(', ')]
    else {
      if (index === 2) {
        if (index < data.length - 1) res = [...res, res[index - 2] + ', '.concat(res[index - 1]), item]
        else res = [
          ...res,
          res[index - 2] + ', '.concat(res[index - 1]),
          item,
          res[index - 1] + ', '.concat(res[index - 1]) + ', '.concat(item)
        ]
      } else if (index > 2) {
        if (index < data.length - 1) res = [...res, res[index - 1] + ', '.concat(res[index]), item]
        else {
          res = [
            ...res, res[index - 1] + ', '.concat(res[index]), item, res[index - 1] + ', '.concat(res[index]) + ', '.concat(item)
          ]
        }
      }
      else res.push(item)
    }
  })

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
