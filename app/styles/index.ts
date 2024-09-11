'use client'

import localFont from 'next/font/local'
import { createGlobalStyle } from 'styled-components'

const interFont = localFont({
  src: [
    {
      path: '../assets/fonts/Inter-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Inter-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})

const robotoFont = localFont({
  src: '../assets/fonts/Roboto-Regular.ttf',
  weight: '400',
  style: 'normal',
})

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
  :root {
    font-size: ${`${percentageInPixel}px`};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${interFont.style.fontFamily};
    font-weight: 600;
  }

  h2 {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.palette.neutral.gray600};
    line-height: ${({ theme }) => theme.lineHeights.md};
  }

  h3 {
    font-family: ${robotoFont.style.fontFamily};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.x2l};
    color: ${({ theme }) => theme.palette.primary.blue950};
  }

  h4 {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.palette.utility.caption};
    line-height: ${({ theme }) => theme.lineHeights.xl};
  }
`
