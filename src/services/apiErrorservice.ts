import { NextResponse } from 'next/server'

export default (err: Error, status: number) => {
  return NextResponse.json({ error: { message: err.message, status } }, { status })
}
