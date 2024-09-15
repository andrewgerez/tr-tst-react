import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  width: 100%;
  height: 3rem;

  background-color: ${({ theme }) => theme.palette.primary.blue950};

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
  }

  img {
    width: 6.4375rem;
    height: 0.875rem;
  }

  #logo {
    width: 6.4375rem;
    height: 0.875rem;
  }
`
