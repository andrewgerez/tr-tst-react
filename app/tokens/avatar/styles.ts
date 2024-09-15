import styled from 'styled-components'

export const AvatarStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primary.blue500};
  text-transform: uppercase;

  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.md};
  color: ${({ theme }) => theme.palette.neutral.white};
`
