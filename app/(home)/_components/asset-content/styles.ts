import styled from 'styled-components'

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border: ${({ theme }) => theme.borderWidths.default}px solid ${({ theme }) => theme.palette.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding: ${({ theme }) => theme.spacing.x2l} ${({ theme }) => theme.spacing.x4l};
  gap: ${({ theme }) => theme.spacing.lg};
`

export const ContentInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.x5l};
  gap: ${({ theme }) => theme.spacing.x5l};
`

export const PrincipalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 14.125rem;
  gap: ${({ theme }) => theme.spacing.x5l};
`

export const ImageWrapper = styled.div`
  width: 21rem;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`

export const InformationWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.x5l};
`

export const Information = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.lg};

  span {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

export const AdditionalInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.x5l};
`

export const ResponsiveContainer = styled(ContentContainer)`
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

export const ResponsivePrincipalContent = styled(PrincipalContent)`
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`
