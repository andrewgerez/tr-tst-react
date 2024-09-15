import { TreeElementType } from "@/enums/business"

export type Asset = {
  id: string
  locationId: string
  name: string
  parentId: string | null
  sensorType: string | null
  status: string | null
  type: TreeElementType
}

export type LocationWithAssets = {
  id: string
  name: string
  parentId: string | null
  assets: Asset[]
  children: LocationWithAssets[]
  type: TreeElementType
}

export type GetCompanyTreeResponse = LocationWithAssets[]
