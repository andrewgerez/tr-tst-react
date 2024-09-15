import ChildrenLayout from '@/layout/children-layout'
import StyledComponentsRegistry from '@/layout/styled-components-registry'
import AppThemeProvider from '@/contexts/theme-context'
import type { Metadata } from 'next'
import { GlobalStyles } from './styles'

export const metadata: Metadata = {
  title: '@TR TST React',
  description: 'Developed by Andrew G.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>
          <AppThemeProvider>
            <>
              <GlobalStyles />
              <ChildrenLayout>{children}</ChildrenLayout>
            </>
          </AppThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
