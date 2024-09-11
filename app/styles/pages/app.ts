import styled from 'styled-components'

export const HomePageContainer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const MainContent = styled.main`
  padding: 0.5rem;
  height: 100%;
`

export const AssetsWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.neutral.white};
  border: 1px solid ${({ theme }) => theme.palette.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
`

export const AssetsWrapperHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`
