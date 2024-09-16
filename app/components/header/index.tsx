import Button from '@/tokens/button'
import useDashboardStore from '@/store/dashboard'
import { GoldIcon, Logo } from '@/assets'
import { Companies, Company } from '@/types/endpoints/get-companies'
import { ComponentSize, ComponentVariant } from '@/enums'
import { memo, useCallback } from 'react'
import { Container } from './styles'

type HeaderProps = {
  companies?: Companies
}

function Header({ companies }: Readonly<HeaderProps>) {
  const currentCompanyActive = useDashboardStore((state) => state.currentCompanyActive)
  const setCurrentCompanyActive = useDashboardStore((state) => state.setCurrentCompanyActive)

  const handleCompanyClick = useCallback((company: Company) => {
    setCurrentCompanyActive(company)
  }, [setCurrentCompanyActive])

  return (
    <Container>
      <Logo />

      <div>
        {companies?.map((company) => (
          <Button
            key={company.id}
            size={ComponentSize.SMALL}
            variant={ComponentVariant.PRIMARY}
            isActive={company.id === currentCompanyActive?.id}
            onClick={() => handleCompanyClick(company)}
          >
            <GoldIcon
              $variant={ComponentVariant.PRIMARY}
              $isActive={company.id === currentCompanyActive?.id}
            />
            {company.name}
          </Button>
        ))}
      </div>
    </Container>
  )
}

export default memo(Header)
