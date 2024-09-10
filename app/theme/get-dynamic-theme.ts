import { AppTheme } from '@/theme/types'

/**
 * Dynamically imports and returns the theme.
 * @param themeName - The name of the theme to import.
 * @returns A promise that resolves to the imported theme.
 */
async function getDynamicTheme(themeName: string): Promise<AppTheme> {
  try {
    const { default: style }: { default: AppTheme } = await import(
      `./custom/${themeName}/index.ts`
    )
    return style
  } catch (error) {
    console.error(`Failed to load theme: ${themeName}`, error)
    throw new Error(`Failed to load theme: ${themeName}`)
  }
}

export default getDynamicTheme
