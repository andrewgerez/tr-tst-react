import styled from 'styled-components'

export const ListContainer = styled.aside`
  display: flex;
  flex-direction: column;

  width: 29.9375rem;
  height: 100%;

  border: ${({ theme }) => theme.borderWidths.default}px solid ${({ theme }) => theme.palette.neutral.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.x2l};
  gap: ${({ theme }) => theme.spacing.xl};

  input {
    flex: 1;
  }
`;

export const TreeWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.25rem;
`;

export const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 1px solid ${({ theme }) => theme.palette.neutral.gray200};
`;

export const TreeNode = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.palette.neutral.gray100};
  }
`;

export const NodeLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ExpandIcon = styled.span<{$isOpen: boolean}>`
  cursor: pointer;

  svg {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
  }
`;

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  cursor: pointer;
`;

export const AssetItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 0;
  gap: ${({ theme }) => theme.spacing.xs};

  svg {
    color: ${({ theme }) => theme.palette.primary.blue500};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.primary.blue500};

    svg {
      color: ${({ theme }) => theme.palette.neutral.white};
    }
  }
`;
