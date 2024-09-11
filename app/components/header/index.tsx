import Button from '@/tokens/button'
import { GoldIcon, Logo } from '@/assets'
import { Container } from './styles'
import { Companies } from '@/types/endpoints/get-companies'
import { ComponentSize, ComponentVariant } from '@/enums'

type HeaderProps = {
  companies?: Companies
}

function Header({ companies }: Readonly<HeaderProps>) {
  return (
    <Container>
      <Logo />

      <div>
        {companies?.map((company) => (
          <Button
            key={company.id}
            size={ComponentSize.SMALL}
            variant={ComponentVariant.PRIMARY}
            isActive={company.name === 'Jaguar'}
          >
            <GoldIcon variant={ComponentVariant.PRIMARY} isActive={company.name === 'Jaguar'} />
            {company.name}
          </Button>
        ))}
      </div>
    </Container>
  )
}

export default Header
