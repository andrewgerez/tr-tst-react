import baseTheme from '@/theme/base'
import { AppTheme } from '@/theme/types'

/**
 * Light theme configuration for the application.
 * Extends the base theme with specific color palettes.
 * @type {AppTheme}
 */
const LightTheme: AppTheme = {
  ...baseTheme,
  palette: {
    neutral: {
      white: '#FFFFFF',
      gray150: '#E3EAEF',
      gray200: '#D8DFE6',
      gray500: '#88929C',
      gray600: '#77818C',
      gray950: '#24292F',
    },
    primary: {
      blue500: '#2188FF',
      blue900: '#023B78',
      blue950: '#17192D',
    },
    utility: {
      placeholder: '#C1C9D2',
      caption: '#88929C',
      operating: '#52C41A',
      alert: '#ED3833',
    },
  },
}

export default LightTheme
