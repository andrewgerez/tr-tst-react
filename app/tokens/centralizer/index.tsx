import { CentralizerContainer } from './styles'

const Centralizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CentralizerContainer>{children}</CentralizerContainer>
}

export default Centralizer
