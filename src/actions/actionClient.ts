import { getServerSession } from 'next-auth'
import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error.message) return error.message

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})

export const authActionClient = actionClient.use(async ({ next, ctx }) => {
  const session = await getServerSession()

  if (!session?.user) throw new Error('You must be logged in to perform this action')
  else return next({ ctx: { ...ctx, ...session.user } })
})
