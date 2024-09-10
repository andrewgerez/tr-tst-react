import { BaseTheme } from '@/theme/types'

/**
 * The base theme configuration for the application.
 * @type {BaseTheme}
 */
const baseTheme: BaseTheme = {
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'Roboto, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  fontWeights: {
    regular: '400',
    medium: '600',
  },
  lineHeights: {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.375rem',
    xl: '1.5rem',
    x2l: '1.75rem',
  },
  borderWidths: {
    default: 1,
  },
  borderRadius: {
    xs: '0.125rem',
    sm: '0.1875rem',
    md: '0.25rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.4375rem',
    lg: '0.5rem',
    xl: '0.625rem',
    x2l: '0.875rem',
    x3l: '1rem',
    x4l: '1.5rem',
  }
}

export default baseTheme
