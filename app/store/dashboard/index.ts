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

  cleanAssetAndFilter: () => {
    set(() => ({
      currentAssetActive: null,
      currentFilterIdActive: null
    }))
  },
}))

export default useDashboardStore
