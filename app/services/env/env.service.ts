import { EnvironmentValidationError } from '@/errors/environment-validation-error'
import { z } from 'zod'

type EnvSchema = z.infer<typeof envSchema>

/**
 * Schema for validating environment variables.
 */
const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

/**
 * Parses and validates the environment variables using the defined schema.
 */
const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  throw new EnvironmentValidationError('Invalid environment variables.')
}

/**
 * The validated environment variables.
 */
export const env: EnvSchema = _env.data
