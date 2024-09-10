import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100vw;
  height: 100vh;

  background-color: #2188FF;

  animation: ${fadeIn} 1s ease-in-out;

  img {
    width: 25rem;
    height: 2.5rem;
  }
`
