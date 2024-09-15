import Button from '@/tokens/button'
import useDashboardStore from '@/store/dashboard'
import { ComponentSize, ComponentVariant } from '@/enums'
import { AssetsHeaderStyled } from './styles'
import { SensorFilter } from '@/enums/business'
import { filters } from '@/utils/business/get-filters'

function AssetsHeader() {
  const {
    currentCompanyActive,
    currentFilterIdActive,
    setCurrentFilterIdActive
  } = useDashboardStore()

  const handleFilterClick = (id: SensorFilter) => {
    setCurrentFilterIdActive(id)
  }

  return (
    <AssetsHeaderStyled>
      <div>
        <h1>Ativos</h1>
        <h2> / {currentCompanyActive?.name}</h2>
      </div>

      <div>
        {filters.map((filter) => {
          const Icon = filter.icon

          return (
            <Button
              key={filter.id}
              id={filter.id}
              size={ComponentSize.DEFAULT}
              variant={ComponentVariant.SECONDARY}
              isActive={currentFilterIdActive === filter.id}
              onClick={() => handleFilterClick(filter.id)}
            >
              <Icon variant={ComponentVariant.SECONDARY} isActive={currentFilterIdActive === filter.id} />
              {filter.label}
            </Button>
          )
        })}
      </div>
    </AssetsHeaderStyled>
  )
}

export default AssetsHeader
