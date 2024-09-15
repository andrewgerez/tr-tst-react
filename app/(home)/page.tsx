'use client'

import Header from '@/components/header'
import AssetsHeader from '@/(home)/_components/assets-header'
import AssetsTree from '@/(home)/_components/assets-tree'
import AssetContent from '@/(home)/_components/asset-content'
import { useGetCompanies } from '@/hooks/http'
import { HomePageContainer, MainContent, AssetsWrapper, AssetsContainer } from '@/styles/pages/home'

export default function Home() {
  const { data: companies } = useGetCompanies()

  return (
    <HomePageContainer>
      <Header companies={companies} />

      <MainContent>
        <AssetsWrapper>
          <AssetsHeader />

          <AssetsContainer>
            <AssetsTree />
            <AssetContent />
          </AssetsContainer>

        </AssetsWrapper>
      </MainContent>
    </HomePageContainer>
  )
}
