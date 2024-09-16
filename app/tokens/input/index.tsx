import { forwardRef } from 'react'
import { StyledInput } from './styles'

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <StyledInput {...props} />
})

export default Input
