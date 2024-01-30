import { NextResponse } from 'next/server'

export default (err: Error, status: number): NextResponse<{ error: { message: string, status: number } }> => {
  return NextResponse.json({ error: { message: err.message, status } }, { status })
}
