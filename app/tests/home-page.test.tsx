import Home from '@/(home)/page'
import { test, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import '@testing-library/jest-dom/vitest'

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

const COMPANY_TEST_NAME = 'Tractian'

test('renders initial home page and clicks the first button in the header', async () => {
  renderWithProviders(<Home />)

  const headingElement = screen.getByRole('heading', { level: 5 })
  expect(headingElement).toHaveTextContent('Please select a company to view the associated assets.')

  const buttonElement = screen.getByRole('button', { name: COMPANY_TEST_NAME })
  fireEvent.click(buttonElement)

  const assetsHeader = screen.getByRole('heading', { level: 1 })
  const assetsHeaderCompany = screen.getByRole('heading', { level: 2 })
  expect(assetsHeader).toHaveTextContent('Ativos')
  expect(assetsHeaderCompany).toHaveTextContent(COMPANY_TEST_NAME)
})
