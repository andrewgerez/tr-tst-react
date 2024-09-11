import styled, { DefaultTheme } from 'styled-components'
import { ComponentSize, ComponentVariant } from '@/enums'
import { StyledButtonProps } from '@/tokens/button/types'

const getFontSize = (theme: DefaultTheme, size: ComponentSize) => {
  return size === ComponentSize.SMALL
    ? theme.fontSizes.xs
    : theme.fontSizes.sm
}

const getLineHeight = (theme: DefaultTheme, size: ComponentSize) => {
  return size === ComponentSize.SMALL
    ? theme.lineHeights.sm
    : theme.lineHeights.md
}

const getBackgroundColor = (
  theme: DefaultTheme,
  variant: ComponentVariant,
  isActive: boolean
) => {
  if (variant === ComponentVariant.PRIMARY) {
    return isActive ? theme.palette.primary.blue500 : theme.palette.primary.blue900
  }

  return isActive ? theme.palette.primary.blue500 : theme.palette.neutral.white
}

const getFontColor = (
  theme: DefaultTheme,
  variant: ComponentVariant,
  isActive: boolean
) => {
  if (variant === ComponentVariant.PRIMARY) return theme.palette.neutral.white

  return isActive ? theme.palette.neutral.white : theme.palette.neutral.gray600
}

const getGap = (theme: DefaultTheme, size: ComponentSize) => {
  return size === ComponentSize.SMALL
    ? theme.spacing.lg
    : theme.spacing.sm
}

const getPadding = (theme: DefaultTheme, size: ComponentSize) => {
  return size === ComponentSize.SMALL
    ? `${theme.spacing.xs} ${theme.spacing.lg}`
    : `${theme.spacing.sm} ${theme.spacing.x3l} ${theme.spacing.sm} ${theme.spacing.x2l}`
}

const getBorder = (theme: DefaultTheme, variant: ComponentVariant, isActive: boolean) => {
  if (variant === ComponentVariant.PRIMARY || variant === ComponentVariant.SECONDARY && isActive) return 'none'

  return `1px solid ${theme.palette.neutral.gray200}`
}

const getRadius = (theme: DefaultTheme, size: ComponentSize) => {
  return size === ComponentSize.SMALL
    ? theme.borderRadius.xs
    : theme.borderRadius.sm
}

export const StyledButton = styled.button<StyledButtonProps>`
  all: unset;

  display: flex;
  align-items: center;
  gap: ${({ theme, $size }) => getGap(theme, $size)};
  padding: ${({ theme, $size }) => getPadding(theme, $size)};
  border: ${({ theme, $variant, $isActive }) => getBorder(theme, $variant, $isActive)};
  border-radius: ${({ theme, $size }) => getRadius(theme, $size)};

  font-size: ${({ theme, $size }) => getFontSize(theme, $size)};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-family: ${({ theme }) => theme.fonts.primary};

  line-height: ${({ theme, $size }) => getLineHeight(theme, $size)};

  color: ${({ theme, $variant, $isActive }) => getFontColor(theme, $variant, $isActive)};
  background-color: ${({ theme, $variant, $isActive }) =>
    getBackgroundColor(theme, $variant, $isActive)};

  &:hover {
    cursor: pointer;
  }
`
