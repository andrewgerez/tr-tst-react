import React from 'react'
import { CustomSVGProps } from '@/assets/icons/types'
import { StyledIconSVG } from '@/styles/components'

const ExclamationSVGIcon: React.FC<CustomSVGProps> = (props) => (
  <StyledIconSVG
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    $variant={props.variant}
    $isActive={props.isActive}
    {...props}
  >
    <path
      d="M8 1C4.13437 1 1 4.13437 1 8C1 11.8656 4.13437 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13437 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
      fill="currentColor"
    />
    <path
      d="M7.24976 10.75C7.24976 10.9489 7.32877 11.1397 7.46943 11.2803C7.61008 11.421 7.80084 11.5 7.99976 11.5C8.19867 11.5 8.38943 11.421 8.53009 11.2803C8.67074 11.1397 8.74976 10.9489 8.74976 10.75C8.74976 10.5511 8.67074 10.3603 8.53009 10.2197C8.38943 10.079 8.19867 10 7.99976 10C7.80084 10 7.61008 10.079 7.46943 10.2197C7.32877 10.3603 7.24976 10.5511 7.24976 10.75ZM7.62476 9H8.37476C8.44351 9 8.49976 8.94375 8.49976 8.875V4.625C8.49976 4.55625 8.44351 4.5 8.37476 4.5H7.62476C7.55601 4.5 7.49976 4.55625 7.49976 4.625V8.875C7.49976 8.94375 7.55601 9 7.62476 9Z"
      fill="currentColor"
    />
  </StyledIconSVG>
)

export default ExclamationSVGIcon
