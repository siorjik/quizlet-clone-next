import { AuthOptions, NextAuthOptions, User } from 'next-auth'

import apiService from '@/services/apiService'
import { UserType } from '@/types/UserTypes'
import { ApiErrType } from '@/types/ErrorTypes'
import { loginApiPath } from '@/utils/paths'
import CredentialsProvider from 'next-auth/providers/credentials'

const authConfig: AuthOptions = {
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

      return { ...user, ...token }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login',
  }
} satisfies NextAuthOptions

export default authConfig
