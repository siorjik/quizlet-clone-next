import { UserType } from '@/types/UserTypes'
import { JWT, getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export default async (req: NextRequest) => await getToken({ req }) as JWT & UserType
