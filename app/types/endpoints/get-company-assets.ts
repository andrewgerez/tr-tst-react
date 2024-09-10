/**
 * Represents an asset belonging to a company.
 */
type CompanyAsset = {
  gatewayId: string
  id: string
  locationId: string
  name: string
  parentId: string | null
  sensorId: string
  sensorType: string
  status: string
}

/**
 * The response type for the GetCompanyAssets API call, which is an array of
 * company assets.
 */
export type GetCompanyAssetsResponse = CompanyAsset[]
