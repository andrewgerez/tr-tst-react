import { create } from 'zustand'
import { DashboardStoreParams } from './types'
import { SensorFilter } from '@/enums/business'
import { Company } from '@/types/endpoints/get-companies'
import { ExtendedCompanyAsset } from '@/types/endpoints/get-company-tree'

const useDashboardStore = create<DashboardStoreParams>((set, get) => ({
  currentCompanyActive: null,
  setCurrentCompanyActive: (company: Company) => {
    const { cleanAssetAndFilter } = get()

    cleanAssetAndFilter()

    set(() => ({ currentCompanyActive: company }))
  },

  currentAssetActive: null,
  setCurrentAssetActive: (asset: ExtendedCompanyAsset) => {
    set(() => ({ currentAssetActive: asset }))
  },

  currentFilterIdActive: null,
  setCurrentFilterIdActive: (filter: SensorFilter) => {
    set(() => ({ currentFilterIdActive: filter }))
  },

  filterQuery: '',
  setFilterQuery: (value: string) => {
    set(() => ({ filterQuery: value }))
  },

  isReadyToRenderContent: false,
  setIsReadyToRenderContent: (value: boolean) => {
    const { cleanAsset } = get()

    if (!value) cleanAsset()

    set(() => ({ isReadyToRenderContent: value }))
  },

  cleanAsset: () => {
    set(() => ({ currentAssetActive: null }))
  },

  cleanAssetAndFilter: () => {
    set(() => ({
      currentAssetActive: null,
      currentFilterIdActive: null,
      filterQuery: '',
    }))
  },
}))

export default useDashboardStore
