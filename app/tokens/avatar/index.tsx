import { AvatarProps } from './types'
import { AvatarStyled } from './styles'

function Avatar({ identifier }: AvatarProps) {
  const firstLetter = identifier.charAt(0)

  return (
    <AvatarStyled>{firstLetter}</AvatarStyled>
  )
}

export default Avatar
