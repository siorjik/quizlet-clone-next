import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

import authConfig from '@/configs/auth'
import { NextRequest } from 'next/server'

const handler = async(req: NextApiRequest & NextRequest, res: NextApiResponse) => await NextAuth(req, res, authConfig(req))

export { handler as GET, handler as POST }
