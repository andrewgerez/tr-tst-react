'use client'

import Header from '@/components/header'
import Button from '@/tokens/button'
import { ExclamationIcon, ThunderIcon } from '@/assets'
import { useGetCompanies } from '@/hooks/http'
import { ComponentSize, ComponentVariant } from '@/enums'
import { AssetsWrapper, AssetsWrapperHeader, HomePageContainer, MainContent } from '@/styles/pages/app'

export default function Home() {
  const { data: companies } = useGetCompanies()

  return (
    <HomePageContainer>
      <Header companies={companies} />

      <MainContent>
        <AssetsWrapper>
          <AssetsWrapperHeader>
            <span>
              <h1>Ativos</h1>
              <h2> / Apex Unit</h2>
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
          </AssetsWrapperHeader>
        </AssetsWrapper>
      </MainContent>
    </HomePageContainer>
  )
}
