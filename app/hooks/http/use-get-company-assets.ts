import APIService from '@/services/api/api.service'
import { useQuery, UseQueryResult } from 'react-query'
import { isValidCompanyId } from '@/utils/regex/company-id-validator'
import { GetCompanyAssetsResponse } from '@/types/endpoints/get-company-assets'

/**
 * Fetches the assets of a specific company from the API.
 * @param {string} companyId - The ID of the company.
 * @throws {Error} If the company ID format is invalid.
 */
async function fetchGetCompanyAssets(
  companyId: string
): Promise<GetCompanyAssetsResponse> {
  if (!isValidCompanyId(companyId)) {
    throw new Error('Invalid company ID format.')
  }

  return await APIService.getInstance().getCompanyAssets(companyId)
}

/**
 * Custom hook to fetch and cache the assets of a specific company using react-query.
 * @param {string} companyId - The ID of the company.
 */
function useGetCompanyAssets(
  companyId: string
): UseQueryResult<GetCompanyAssetsResponse, unknown> {
  return useQuery({
    queryKey: ['getCompanyAssets', companyId],
    queryFn: () => fetchGetCompanyAssets(companyId),
  })
}

export default useGetCompanyAssets
