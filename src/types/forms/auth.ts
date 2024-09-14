import z from 'zod'

export const loginFormTypeSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const registerFormTypeSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  name: z.string().min(1, { message: 'Name is required' }),
})

export const createPassFormTypeSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'The Password and Confirm Password must be the same!',
    })
  }
})

export const createPassActionTypeSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  token: z.string().min(1, { message: 'Token is required' }),
})
