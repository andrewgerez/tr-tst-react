import Button from '@/tokens/button'
import { ThunderIcon, ExclamationIcon } from '@/assets'
import { ComponentSize, ComponentVariant } from '@/enums'
import { AssetsHeaderStyled } from './styles'

function AssetsHeader() {
  return (
    <AssetsHeaderStyled>
      <span>
        <h1>Ativos</h1>
        <h2> / Jaguar</h2>
      </span>

      <span>
        <Button size={ComponentSize.DEFAULT} variant={ComponentVariant.SECONDARY} isActive={true}>
          <ThunderIcon variant={ComponentVariant.SECONDARY} isActive={true} />
          Sensor de Energia
        </Button>

        <Button size={ComponentSize.DEFAULT} variant={ComponentVariant.SECONDARY}>
          <ExclamationIcon variant={ComponentVariant.SECONDARY} isActive={false} />
          Crítico
        </Button>
      </span>
    </AssetsHeaderStyled>
  )
}

export default AssetsHeader
