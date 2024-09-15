import { SensorStatus, SensorType, TreeElementType } from '@/enums/business'
import { CompanyAsset } from './get-company-assets'

export type Asset = {
  id: string
  locationId: string
  gatewayId: string | null
  name: string
  parentId: string | null
  sensorId: string | null
  sensorType: SensorType | null
  status: SensorStatus | null
  type: TreeElementType
}

export type OriginalLocationWithAssets = {
  id: string
  name: string
  parentId: string | null
  assets: Asset[]
  children: OriginalLocationWithAssets[]
  type: TreeElementType
}

export type GetCompanyTreeResponse = LocationWithAssets[]

export interface ExtendedCompanyAsset extends CompanyAsset {
  components?: ExtendedCompanyAsset[]
  subAssets?: ExtendedCompanyAsset[]
  type: TreeElementType
}

export interface LocationWithAssets extends OriginalLocationWithAssets {
  components?: ExtendedCompanyAsset[]
  assets: ExtendedCompanyAsset[]
  children: LocationWithAssets[]
  type: TreeElementType
}

export type FullCompanyTree = LocationWithAssets[]
