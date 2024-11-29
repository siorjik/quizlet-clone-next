import { NextResponse, NextRequest } from 'next/server'

import { ApiErrType } from '@/types/ErrorTypes'
import StorageService from '@/services/storageService'

const storageService = new StorageService()

export async function POST(req: Request) {
  const { file } = await req.json()
  const fileName = req.headers.get('x-file-name')

  try {
    const url = await storageService.uploadFile(file, fileName!)
  
    return NextResponse.json({ url })
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })  
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  try {
    const authorizedUrl = storageService.getAuthFileUrl(url!)

    return NextResponse.json({ url: authorizedUrl })
  } catch (error) {
    const err = error as ApiErrType

    return NextResponse.json({ ...err })
  }
}
