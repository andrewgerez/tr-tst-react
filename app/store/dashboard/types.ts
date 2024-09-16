import { SensorFilter } from '@/enums/business'
import { Company } from '@/types/endpoints/get-companies'
import { ExtendedCompanyAsset } from '@/types/endpoints/get-company-tree'

export type DashboardStoreParams = {
  currentCompanyActive: Company | null
  setCurrentCompanyActive: (company: Company) => void

  currentAssetActive: ExtendedCompanyAsset | null
  setCurrentAssetActive: (asset: ExtendedCompanyAsset) => void

  currentFilterIdActive: SensorFilter | null
  setCurrentFilterIdActive: (filter: SensorFilter) => void

  filterQuery: string
  setFilterQuery: (value: string) => void

  isReadyToRenderContent: boolean
  setIsReadyToRenderContent: (value: boolean) => void

  cleanAsset: () => void
  cleanAssetAndFilter: () => void
}
