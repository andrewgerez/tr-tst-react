import { EnvironmentValidationError } from '@/errors/environment-validation-error'
import { z } from 'zod'

type EnvSchema = z.infer<typeof envSchema>

const envObject: EnvSchema = {
  NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API ?? '',
  NEXT_PUBLIC_BFF_URL: process.env.NEXT_PUBLIC_BFF_URL ?? '',
}

/**
 * Schema for validating environment variables.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API: z.string().url(),
  NEXT_PUBLIC_BFF_URL: z.string().url(),
})

/**
 * Parses and validates the environment variables using the defined schema.
 */
const _env = envSchema.safeParse(envObject)

if (_env.success === false) {
  throw new EnvironmentValidationError('Invalid environment variables.')
}

/**
 * The validated environment variables.
 */
export const env: EnvSchema = _env.data
