import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import dotenv from 'dotenv'
import '@testing-library/jest-dom/vitest'

dotenv.config()

afterEach(() => {
  cleanup()
})
