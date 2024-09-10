/**
 * Represents a location belonging to a company.
 */
type CompanyLocation = {
  id: string
  name: string
  parentId: string
}

/**
 * The response type for the GetCompanyLocations API call, which is an array of
 * company locations.
 */
export type GetCompanyLocationsResponse = CompanyLocation[]
