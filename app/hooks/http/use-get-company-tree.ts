import APIService from '@/services/api/api.service'
import { useQuery, UseQueryResult } from 'react-query'
import { isValidCompanyId } from '@/utils/regex/company-id-validator'
import { GetCompanyTreeResponse } from '@/types/endpoints/get-company-tree'

/**
 * Fetches the full tree of a specific company from the API.
 * @param {string} companyId - The ID of the company.
 * @throws {Error} If the company ID format is invalid.
 */
async function fetchGetCompanyTree(
  companyId: string
): Promise<GetCompanyTreeResponse> {
  if (!isValidCompanyId(companyId)) {
    throw new Error('Invalid company ID format.')
  }

  const data = await APIService.getInstance().getCompanyTree(companyId)

  return data
}

/**
 * Custom hook to fetch and cache the full tree of a specific company using react-query.
 * @param {string} companyId - The ID of the company.
 */
function useGetCompanyTree(
  companyId?: string
): UseQueryResult<GetCompanyTreeResponse, unknown> {
  function getCompanyTreeQueryFn(companyId?: string): () => Promise<GetCompanyTreeResponse> {
    return () => (companyId ? fetchGetCompanyTree(companyId) : Promise.resolve({} as GetCompanyTreeResponse));
  }

  return useQuery({
    queryKey: ['getCompanyTree', companyId],
    queryFn: getCompanyTreeQueryFn(companyId),
    enabled: !!companyId,
  })
}

export default useGetCompanyTree
