import queryClient from '@/services/client/client.service'
import getDynamicTheme from '@/theme/get-dynamic-theme'
import { AppTheme } from '@/theme/types'
import { render } from '@testing-library/react'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'

let theme: AppTheme

beforeEach(async () => {
  theme = await getDynamicTheme('light-theme')
})

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export { renderWithProviders }
