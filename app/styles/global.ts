import { ComponentVariant } from '@/enums'
import styled, { DefaultTheme } from 'styled-components'

const getIconColor = (
  theme: DefaultTheme,
  variant: ComponentVariant,
  isActive: boolean
) => {
  if (variant === ComponentVariant.PRIMARY) return theme.palette.neutral.white

  return isActive ? theme.palette.neutral.white : theme.palette.primary.blue500
}

export const StyledIconSVG = styled.svg<{ $variant: ComponentVariant; $isActive: boolean }>`
  color: ${({ theme, $variant, $isActive }) => getIconColor(theme, $variant, $isActive)};
`
