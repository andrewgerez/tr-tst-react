/**
 * Represents a location belonging to a company.
 */
export type CompanyLocation = {
  id: string
  name: string
  parentId: string
}

/**
 * Represents a structured location, which includes the location's children.
 */
export type StructuredLocation = {
  id: string
  name: string
  children: CompanyLocation[]
}

/**
 * The response type for the GetCompanyLocations API call, which is an array of
 * company locations.
 */
export type GetCompanyLocationsResponse = CompanyLocation[]
