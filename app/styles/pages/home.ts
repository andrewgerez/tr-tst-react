import styled from 'styled-components'

export const HomePageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`

export const AssetsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.x4l};
  gap: ${({ theme }) => theme.spacing.x2l};

  background-color: ${({ theme }) => theme.palette.neutral.white};
  border: 1px solid ${({ theme }) => theme.palette.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

export const AssetsContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: hidden;
  gap: ${({ theme }) => theme.spacing.lg};
`
