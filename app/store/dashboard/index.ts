import { create } from 'zustand'
import { DashboardStoreParams } from './types'
import { SensorFilter } from '@/enums/business'
import { Company } from '@/types/endpoints/get-companies'
import { Asset } from '@/types/endpoints/get-company-tree'

const useDashboardStore = create<DashboardStoreParams>((set) => ({
  currentCompanyActive: null,
  setCurrentCompanyActive: (company: Company) => {
    set(() => ({ currentCompanyActive: company }))
  },

  currentAssetActive: null,
  setCurrentAssetActive: (asset: Asset) => {
    set(() => ({ currentAssetActive: asset }))
  },

  currentFilterIdActive: null,
  setCurrentFilterIdActive: (filter: SensorFilter) => {
    set(() => ({ currentFilterIdActive: filter }))
  },
}))

export default useDashboardStore
