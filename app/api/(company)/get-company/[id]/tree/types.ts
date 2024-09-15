import { TreeElementType } from '@/enums/business'
import { CompanyAsset } from '@/types/endpoints/get-company-assets'

export interface ExtendedCompanyAsset extends CompanyAsset {
  components?: ExtendedCompanyAsset[]
  subAssets?: ExtendedCompanyAsset[]
  type: TreeElementType
}
