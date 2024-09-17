import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import dotenv from 'dotenv'
import '@testing-library/jest-dom/vitest'

dotenv.config()

vi.mock('next/font/local', () => ({
  default: () => ({
    style: {
      fontFamily: 'mocked-font-family',
    },
  }),
}))

vi.mock('@/hooks/http', () => ({
  useGetCompanies: () => ({
    data: [
      {
        id: 'tractian_123456',
        name: 'Tractian'
      },
      {
        id: 'tractiania_123456',
        name: 'Tractian IA'
      },
    ],
    isLoading: false,
  }),
}))

afterEach(() => {
  cleanup()
})
