import { ComponentVariant } from '@/enums'
import { DefaultTheme } from 'styled-components'

export const getIconColor = (
  theme: DefaultTheme,
  variant: ComponentVariant,
  isActive: boolean
) => {
  if (variant === ComponentVariant.PRIMARY) return theme.palette.neutral.white

  return isActive ? theme.palette.neutral.white : theme.palette.primary.blue500
}
