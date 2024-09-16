import { test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import Home from '@/(home)/page'
import '@testing-library/jest-dom/vitest'

vi.mock('next/font/local', () => ({
  default: () => ({
    style: {
      fontFamily: 'mocked-font-family',
    },
  }),
}))

test('initial home page load', async () => {
  renderWithProviders(<Home />)

  const element = screen.getByRole('heading', { level: 5 })
  expect(element).toHaveTextContent('Please select a company to view the associated assets.')
})
