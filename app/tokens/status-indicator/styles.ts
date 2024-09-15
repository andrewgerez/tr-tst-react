import styled from 'styled-components'
import { StyledStatusIndicatorProps } from './types'

export const StatusStyled = styled.div<StyledStatusIndicatorProps>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${({ theme, $status }) => theme.palette.utility[$status]};
`
