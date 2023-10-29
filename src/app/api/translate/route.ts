import apiErrorservice from '@/services/apiErrorservice'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest):
  Promise<NextResponse<string[] | [] | { error: { message: string, status: number } }>> {
  try {
    const word = req.nextUrl.searchParams.get('word')

    const words = await fetch(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|ru&mt=1`)
    const res: { matches: { translation: string }[] } = await words.json()
    
    return NextResponse.json(word ? res.matches.map(item => item.translation) : [])
  } catch (error) {
    const err = error as Error

    return apiErrorservice(err, 400)
  }
}
