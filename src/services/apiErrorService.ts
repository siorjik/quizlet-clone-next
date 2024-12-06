import { NextResponse } from 'next/server'

import { ApiErrType } from '@/types/ErrorTypes'

export default (
  err: Error & ApiErrType
): NextResponse<ApiErrType> => {
  return NextResponse.json({
    error: err.error || 'server error', message: err.message || 'server error', statusCode: err.statusCode || 500
  })
}
