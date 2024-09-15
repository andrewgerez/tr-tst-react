import { SelectionLoadingProps } from './types'
import { Container } from './styles'
import AnimatedLoader from '@/tokens/animated-loader'

function SelectionLoading({ message }: SelectionLoadingProps) {
  return (
    <Container>
      <AnimatedLoader />
      <h5>{message}</h5>
    </Container>
  )
}

export default SelectionLoading
