import { AuthOptions, NextAuthOptions, Session, User } from 'next-auth'
import { NextRequest } from 'next/server'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import apiService from '@/services/apiService'
import { UserType } from '@/types/UserTypes'
import { ApiErrType } from '@/types/ErrorTypes'
import { getRefreshApiPath, loginApiPath, loginProviderApiPath } from '@/utils/paths'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import getApiPath from '@/helpers/getApiPath'

export default (req: NextRequest): AuthOptions => {
  return {
    providers: [
      GithubProvider({ clientId: process.env.GIT_AUTH_CLIENT_ID ?? '', clientSecret: process.env.GIT_AUTH_CLIENT_SECRET ?? '' }),
      GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID ?? '', clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '' }),
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
          else throw new Error(result.message as string)
        }
      })
    ],

    session: {
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 7
    },

    callbacks: {
      jwt: async ({ token, user, account, trigger, session }) => {
        let tokenCopy = token as UserType & JWT
        const isProvider = account?.provider === 'google' || account?.provider === 'github'

        // session update from client
        if (trigger === 'update') tokenCopy = { ...tokenCopy, ...session }

        if (isProvider) {
          const res: UserType = await apiService<UserType>({
            url: loginProviderApiPath, body: { email: user.email!, name: user.name! }, method: 'POST'
          })

          if (!('_id' in res)) throw new Error('Error with log in/log on via provider...')
          else tokenCopy = { ...tokenCopy, ...res }
        }

        // access and refresh tokens update
        if (req.url.includes('update')) {
          const res = await apiService<{ accessExpire: string, accessToken: string, refreshToken: string } | ApiErrType>
            ({ url: getApiPath(getRefreshApiPath(tokenCopy.refreshToken), true), req })

          if ('statusCode' in res && res.statusCode === 401) throw new Error(res.message as string)
          else tokenCopy = { ...tokenCopy, ...res }
        }

        return { ...user, ...tokenCopy }
      },

      session: async ({ session, token }) => {
        let sessionCopy = session as Session & { accessExpire: string }

        sessionCopy.accessExpire = token.accessExpire as string

        return { ...session, user: { name: token.name, email: token.email } }
      }
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
      signIn: '/login',
    }
  } satisfies NextAuthOptions
}
