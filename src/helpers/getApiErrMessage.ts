import { ApiErrType } from '@/types/ErrorTypes'

export default (err: ApiErrType) => typeof err.message === 'string' ? err.message : err.message.join(', ')
