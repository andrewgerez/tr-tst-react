import { AppTheme } from '@/theme/types'

export type ThemeContextProps = {
  children: JSX.Element
}

export type ThemeContextType = {
  theme: AppTheme
  loading: boolean
  error: Error | null
}
