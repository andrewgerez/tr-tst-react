import styled from 'styled-components'

export const StyledInput = styled.input`
  all: unset;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.md};

  &::placeholder {
    color: ${({ theme }) => theme.palette.utility.placeholder};
  }
`
