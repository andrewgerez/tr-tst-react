import styled, { keyframes } from 'styled-components'

const dotsAnimation = keyframes`
  20% { background-position: 0% 0%, 50% 50%, 100% 50%; }
  40% { background-position: 0% 100%, 50% 0%, 100% 50%; }
  60% { background-position: 0% 50%, 50% 100%, 100% 0%; }
  80% { background-position: 0% 50%, 50% 50%, 100% 100%; }
`

export const StyledLoader = styled.div`
  width: 1.75rem;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #FFF 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: ${dotsAnimation} 1s infinite linear;
`
