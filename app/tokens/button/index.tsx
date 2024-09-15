import { FC } from 'react'
import { StyledButton } from '@/tokens/button/styles'
import { TokenButtonProps } from '@/tokens/button/types'

const Button: FC<TokenButtonProps> = ({
  id,
  variant,
  size,
  children,
  onClick,
  isActive = false
}) => {
  return (
    <StyledButton
      id={id}
      $variant={variant}
      $size={size}
      $isActive={isActive}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
