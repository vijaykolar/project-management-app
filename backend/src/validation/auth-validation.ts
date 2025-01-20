import { z } from 'zod';

export const emailSchema = z.string().trim().email('Invalid email').max(255);

export const passwordSchema = z.string().min(6).max(255);

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().email(),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
