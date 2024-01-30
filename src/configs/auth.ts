import { AuthOptions, NextAuthOptions, Session, User } from 'next-auth'
import { NextRequest } from 'next/server'

import apiService from '@/services/apiService'
import { UserType } from '@/types/UserTypes'
import { ApiErrType } from '@/types/ErrorTypes'
import { getRefreshApiPath, loginApiPath } from '@/utils/paths'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import getApiPath from '@/helpers/getApiPath'

export default (req: NextRequest): AuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text', required: true },
          password: { label: 'Password', type: 'password', required: true },
        },
        async authorize(credentials) {
          const result: UserType | ApiErrType =
            await apiService<UserType | ApiErrType>({ url: loginApiPath, body: credentials, method: 'POST' })

          if ('_id' in result) return result as User & UserType
          else throw new Error(result.message)
        }
      })
    ],

    session: {
      strategy: 'jwt',
    },

    callbacks: {
      jwt: async ({ token, user }) => {
        let tokenCopy = token as UserType & JWT

        if (req.url.includes('update')) {
          const res = await apiService<{ accessExpire: string, accessToken: string, refreshToken: string } | ApiErrType>
            ({ url: getApiPath(getRefreshApiPath(tokenCopy.refreshToken), true), req })

          if ('statusCode' in res && res.statusCode === 401) throw new Error(res.message)
          else tokenCopy = { ...tokenCopy, ...res }
        }

        return { ...user, ...tokenCopy }
      },

      session: async ({ session, token }) => {
        let sessionCopy = session as Session & { accessExpire: string }

        sessionCopy.accessExpire = token.accessExpire as string

        return session
      }
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
      signIn: '/login',
    }
  } satisfies NextAuthOptions
}
