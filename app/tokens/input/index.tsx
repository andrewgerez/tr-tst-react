import { FC } from 'react'
import { InputProps } from './types'
import { StyledInput } from './styles'

const Input: FC<InputProps> = (props) => {
  return (
    <StyledInput {...props} />
  )
}

export default Input
