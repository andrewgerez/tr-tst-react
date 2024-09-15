import styled from 'styled-components'

export const ListContainer = styled.aside`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  max-width: 29.9375rem;
  max-height: 100%;

  border: ${({ theme }) => theme.borderWidths.default}px solid ${({ theme }) => theme.palette.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.x2l};
  gap: ${({ theme }) => theme.spacing.xl};

  input {
    flex: 1;
  }
`

export const TreeScrollWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
`
