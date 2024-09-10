import { createGlobalStyle } from 'styled-components'

const resolution: number = window.innerWidth
const defaultResolution = 1920
const baseFontSize = 16

const percentagePerResolution = (resolution * 100) / defaultResolution
const percentageInPixel = (baseFontSize * percentagePerResolution) / 100

/**
 * Global styles for the application.
 * Sets the base font size relative to the screen resolution.
 */
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: ${`${percentageInPixel}px`};
  }
`
