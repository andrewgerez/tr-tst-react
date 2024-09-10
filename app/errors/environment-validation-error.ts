/**
 * Custom error class for environment validation errors.
 * @extends {Error}
 */
export class EnvironmentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EnvironmentValidationError'
  }
}
