import Button from '@/tokens/button'
import useDashboardStore from '@/store/dashboard'
import { ComponentSize, ComponentVariant } from '@/enums'
import { SensorFilter } from '@/enums/business'
import { memo, useCallback } from 'react'
import { filters } from '@/utils/business/get-filters'
import { AssetsHeaderStyled } from './styles'

function AssetsHeader() {
  const currentCompanyActive = useDashboardStore((state) => state.currentCompanyActive)
  const currentFilterIdActive = useDashboardStore((state) => state.currentFilterIdActive)
  const setCurrentFilterIdActive = useDashboardStore((state) => state.setCurrentFilterIdActive)

  const handleFilterClick = useCallback((id: SensorFilter) => {
    setCurrentFilterIdActive(id)
  }, [setCurrentFilterIdActive])

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
              <Icon $variant={ComponentVariant.SECONDARY} $isActive={currentFilterIdActive === filter.id} />
              {filter.label}
            </Button>
          )
        })}
      </div>
    </AssetsHeaderStyled>
  )
}

export default memo(AssetsHeader)
