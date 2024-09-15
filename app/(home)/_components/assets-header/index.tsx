import Button from '@/tokens/button'
import useDashboardStore from '@/store/dashboard'
import { ThunderIcon, ExclamationIcon } from '@/assets'
import { ComponentSize, ComponentVariant } from '@/enums'
import { AssetsHeaderStyled } from './styles'

function AssetsHeader() {
  const { currentCompanyActive } = useDashboardStore()

  return (
    <AssetsHeaderStyled>
      <div>
        <h1>Ativos</h1>
        <h2> / {currentCompanyActive?.name}</h2>
      </div>

      <div>
        <Button size={ComponentSize.DEFAULT} variant={ComponentVariant.SECONDARY} isActive={true}>
          <ThunderIcon variant={ComponentVariant.SECONDARY} isActive={true} />
          Sensor de Energia
        </Button>

        <Button size={ComponentSize.DEFAULT} variant={ComponentVariant.SECONDARY}>
          <ExclamationIcon variant={ComponentVariant.SECONDARY} isActive={false} />
          Crítico
        </Button>
      </div>
    </AssetsHeaderStyled>
  )
}

export default AssetsHeader
