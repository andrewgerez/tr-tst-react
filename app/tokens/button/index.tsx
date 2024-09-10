import { FC } from 'react'
import { StyledButton } from '@/tokens/button/styles'
import { TokenButtonProps } from '@/tokens/button/types'

const Button: FC<TokenButtonProps> = ({
  variant,
  size,
  children,
  isActive = false
}) => {
  return (
    <StyledButton $variant={variant} $size={size} $isActive={isActive}>
      {children}
    </StyledButton>
  )
}

export default Button
