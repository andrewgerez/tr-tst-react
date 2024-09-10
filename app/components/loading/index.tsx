import Loader from '@/tokens/loader'
import { Logo } from '@/assets'
import { Container } from './styles'

function Loading() {
  return (
    <Container>
      <Logo />
      <Loader />
    </Container>
  )
}

export default Loading
