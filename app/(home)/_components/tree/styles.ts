import styled from 'styled-components'

export const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 1px solid ${({ theme }) => theme.palette.neutral.gray200};
`

export const TreeNode = styled.div`
  display: flex;
  flex-direction: column;
`

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.palette.neutral.gray100};
  }
`

export const NodeLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ExpandIcon = styled.span<{$isOpen: boolean}>`
  cursor: pointer;

  svg {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
  }
`

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  cursor: pointer;
`

export const ComponentItem = styled.div<{isActive: boolean}>`
  display: flex;
  align-items: center;

  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ isActive, theme }) => isActive && `
    background-color: ${theme.palette.primary.blue500};

    svg {
      color: ${theme.palette.neutral.white};
    }
  `}
`
