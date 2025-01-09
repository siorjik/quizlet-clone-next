import getApiErrMessage from '@/helpers/getApiErrMessage'
import { ApiErrType } from '@/types/ErrorTypes'

describe('getApiErrMessage', () => {
  it('should return error message from string', () => {
    const error = { message: 'some error message', statusCode: 400, error: 'error' } as ApiErrType

    expect(getApiErrMessage(error)).toBe(typeof error.message === 'string' ? error.message : error.message.join(', '))
  })

  it('should return error message from array', () => {
    const error = { message: ['some error message', 'some other error message'], statusCode: 400, error: 'error' } as ApiErrType

    expect(getApiErrMessage(error)).toBe(typeof error.message === 'string' ? error.message : error.message.join(', '))
  })
})
