import Loading from '@/components/loading'
import getDynamicTheme from '@/theme/get-dynamic-theme'
import { createContext, useEffect, useMemo, useState } from 'react'
import { AppTheme } from '@/theme/types'
import { ThemeContextType, ThemeContextProps } from './types'
import { ThemeProvider } from 'styled-components'

/**
 * Context for the application theme.
 * @type {React.Context<ThemeContextType | undefined>}
 */
export const ThemeContext: React.Context<ThemeContextType | undefined>
  = createContext<ThemeContextType | undefined>(undefined)

/**
* Application theme provider.
* @param {ThemeContextProps} props - The component props.
* @param {React.ReactNode} props.children - The child components to be wrapped by the theme provider.
*/
const AppThemeProvider = ({ children }: ThemeContextProps): JSX.Element => {
  const [theme, setTheme] = useState<AppTheme>({} as AppTheme)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getDynamicTheme('light-theme')
        setTheme(theme)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    loadTheme()
  }, [])

  const value = useMemo(() => ({
    theme, loading, error
  }), [theme, loading, error])

  if (loading || error) {
    return <Loading />
  }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default AppThemeProvider
