/**
 * @jest-environment node
 */

import apiErrorService from '@/services/apiErrorService'
import { ApiErrType } from '@/types/ErrorTypes'
import { NextResponse } from 'next/server'

describe('apiErrorService', () => {
  it('should return error object with defined values', () => {
    const err = {
      error: 'defined error',
      message: 'defined message',
      statusCode: 400
    } as ApiErrType & Error

    jest.spyOn(NextResponse, 'json')

    apiErrorService(err)

    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'defined error', message: 'defined message', statusCode: 400 })
  })

  it('should return error object with default values', () => {
    const err = { message: 'fetch failed' } as ApiErrType & Error

    jest.spyOn(NextResponse, 'json')

    apiErrorService(err)

    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'server error', message: 'fetch failed', statusCode: 500 })
  })
})
