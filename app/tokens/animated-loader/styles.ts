import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0%,
  100% {
    box-shadow: .2em 0 0 0 currentcolor;
  }
  12% {
    box-shadow: .2em .2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 .2em 0 0 currentcolor;
  }
  37% {
    box-shadow: -.2em .2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -.2em -.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0 -.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: .2em -.2em 0 0 currentcolor;
  }
`

export const Loader = styled.div`
  transform: rotateZ(45deg);
  perspective: 1000;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  color: ${({ theme }) => theme.palette.primary.blue900};
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: ${spin} 1s linear infinite;
  }

  &::after {
    color: ${({ theme }) => theme.palette.primary.blue500};
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }
`
