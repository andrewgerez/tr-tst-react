'use client'

import Header from '@/components/header'
import AssetsHeader from '@/(home)/_components/assets-header'
import AssetsTree from '@/(home)/_components/assets-tree'
import AssetContent from '@/(home)/_components/asset-content'
import useDashboardStore from '@/store/dashboard'
import Loading from '@/components/loading'
import SelectionLoading from '@/components/selection-loading'
import { useGetCompanies } from '@/hooks/http'
import { HomePageContainer, MainContent, AssetsWrapper, AssetsContainer } from '@/styles/pages/home'

export default function Home() {
  const { data: companies, isLoading: companiesIsLoading } = useGetCompanies()
  const currentCompanyActive = useDashboardStore((state) => state.currentCompanyActive)

  if (companiesIsLoading) {
    return <Loading />
  }

  return (
    <HomePageContainer>
      <Header companies={companies} />

      <MainContent>
        {currentCompanyActive ? (
          <AssetsWrapper>
            <AssetsHeader />

            <AssetsContainer>
              <AssetsTree />
              <AssetContent />
            </AssetsContainer>

          </AssetsWrapper>
        ) : (
          <SelectionLoading message='Please select a company to view the associated assets.' />
        )}
      </MainContent>
    </HomePageContainer>
  )
}
