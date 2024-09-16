import styled from 'styled-components'
import { baseFontSize } from '@/styles'
import { VirtualizedItemParams } from './types'

export const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  height: 100%;
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 1px solid ${({ theme }) => theme.palette.neutral.gray200};
`

export const VirtualizedWrapper = styled.div<Pick<VirtualizedItemParams, '$virtualHeight'>>`
  position: relative;
  height: ${({ $virtualHeight }) => $virtualHeight / baseFontSize}rem;
  width: 100%;
`

export const VirtualizedItem = styled.div<Omit<VirtualizedItemParams, '$virtualHeight'>>`
  position: absolute;
  top: 0;
  left: ${({ $virtualLeft }) => $virtualLeft / baseFontSize}rem;
  width: ${({ $virtualWidth }) => `calc(100% - ${$virtualWidth / baseFontSize}rem)`};
  transform: ${({ $virtualTranslate }) => `translateY(${ $virtualTranslate / baseFontSize }rem)`};
  padding-left: ${({ $virtualLeft }) => $virtualLeft / baseFontSize}rem;
  margin-bottom: 0.5rem;
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
  padding: ${({ theme }) => theme.spacing.lg} 0;

  &:hover {
    background-color: ${({ theme }) => theme.palette.neutral.gray100};
  }
`

export const NodeLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const ExpandIcon = styled.span<{ $isOpen: boolean }>`
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

export const ComponentItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $isActive, theme }) => $isActive && `
    background-color: ${theme.palette.primary.blue500};

    svg {
      color: ${theme.palette.neutral.white};
    }
  `}
`
