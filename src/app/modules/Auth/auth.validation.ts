import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Id is required.' }),
    password: z.string(),
  }),
});



export const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    img: z.string().optional(),
    role: z.string().default('user'),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerUserValidationSchema,
};
