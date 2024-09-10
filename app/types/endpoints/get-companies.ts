/**
 * Represents a company with an ID and a name.
 */
type Company = {
  id: string
  name: string
}

/**
 * The response type for the GetCompanies API call, which is an array of
 * companies.
 */
export type Companies = Company[]
