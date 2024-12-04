import { NextResponse } from 'next/server'

import { ApiErrType } from '@/types/ErrorTypes'

export default (
  err: Error & ApiErrType, status: number = 500
): NextResponse<ApiErrType> => {
  return NextResponse.json({ error: err.error || 'error', message: err.message, statusCode: err.statusCode || status })
}
