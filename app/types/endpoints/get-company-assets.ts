import { SensorStatus, SensorType } from "@/enums/business"

/**
 * Represents an asset belonging to a company.
 */
export type CompanyAsset = {
  gatewayId: string
  id: string
  locationId: string
  name: string
  parentId: string | null
  sensorId: string
  sensorType: SensorType | null
  status: SensorStatus | null
}

/**
 * The response type for the GetCompanyAssets API call, which is an array of
 * company assets.
 */
export type GetCompanyAssetsResponse = CompanyAsset[]
