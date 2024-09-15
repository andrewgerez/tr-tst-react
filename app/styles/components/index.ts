import styled from 'styled-components'
import { ComponentVariant } from '@/enums'
import { getIconColor } from '@/utils/style/get-icon-color'

export const StyledIconSVG = styled.svg<{ $variant: ComponentVariant; $isActive: boolean }>`
  color: ${({ theme, $variant, $isActive }) => getIconColor(theme, $variant, $isActive)};
`
