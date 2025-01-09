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
  password: z.string().min(5, { message: 'Password length must be at least 5' }),
  confirmPassword: z.string().min(5, { message: 'Confirm password length must be at least 5' }),
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
  password: z.string().min(5, { message: 'Password length must be at least 5' }),
  token: z.string().min(1, { message: 'Token is required' }),
})

export const changePassFormTypeSchema = z.object({
  currentPass: z.string().min(1, { message: 'Password is required' }),
  newPass: z.string().min(5, { message: 'New password length must be at least 5' }),
})
