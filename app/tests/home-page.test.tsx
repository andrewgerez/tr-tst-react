import Home from '@/(home)/page'
import { test, expect, describe } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import '@testing-library/jest-dom/vitest'

const COMPANY_TEST_NAME = 'Tractian'

describe('Home Page', () => {
  const renderHomePage = () => renderWithProviders(<Home />)

  const getElements = () => ({
    headingElement: screen.getByRole('heading', { level: 5 }),
    buttonElement: screen.getByRole('button', { name: COMPANY_TEST_NAME }),
    assetsHeader: screen.findByRole('heading', { level: 1 }),
    assetsHeaderCompany: screen.findByRole('heading', { level: 2 })
  })

  test('renders home page with correct heading', () => {
    renderHomePage()

    const { headingElement } = getElements()

    expect(headingElement).toHaveTextContent('Please select a company to view the associated assets.')
  })

  test('renders home page and clicks the first button in the header', async () => {
    renderHomePage()

    const { headingElement, buttonElement, assetsHeader, assetsHeaderCompany } = getElements()

    expect(headingElement).toHaveTextContent('Please select a company to view the associated assets.')
    fireEvent.click(buttonElement)

    expect(await assetsHeader).toHaveTextContent('Ativos')
    expect(await assetsHeaderCompany).toHaveTextContent(COMPANY_TEST_NAME)

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Buscar Ativo ou Local')
      expect(searchInput).toBeInTheDocument()
    })
  })
})
