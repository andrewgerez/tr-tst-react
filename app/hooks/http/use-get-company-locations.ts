import APIService from '@/services/api/api.service'
import { useQuery, UseQueryResult } from 'react-query'
import { isValidCompanyId } from '@/utils/regex/company-id-validator'
import { GetCompanyLocationsResponse } from '@/types/endpoints/get-company-locations'

/**
 * Fetches the locations of a specific company from the API.
 * @param {string} companyId - The ID of the company.
 * @throws {Error} If the company ID format is invalid.
 */
async function fetchGetCompanyLocations(
  companyId: string
): Promise<GetCompanyLocationsResponse> {
  if (!isValidCompanyId(companyId)) {
    throw new Error('Invalid company ID format.')
  }

  return await APIService.getInstance().getCompanyLocations(companyId)
}

/**
 * Custom hook to fetch and cache the locations of a specific company using react-query.
 * @param {string} companyId - The ID of the company.
 */
function useGetCompanyLocations(
  companyId: string | undefined
): UseQueryResult<GetCompanyLocationsResponse, unknown> {
  if (!companyId) return {} as UseQueryResult<GetCompanyLocationsResponse, unknown>

  return useQuery({
    queryKey: ['getCompanyLocations', companyId],
    queryFn: () => fetchGetCompanyLocations(companyId),
  })
}

export default useGetCompanyLocations
