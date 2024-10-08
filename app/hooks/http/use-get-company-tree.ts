import APIService from '@/services/api/api.service'
import useDashboardStore from '@/store/dashboard'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { isValidCompanyId } from '@/utils/regex/company-id-validator'
import { FullCompanyTreeReturn, GetCompanyTreeResponse } from '@/types/endpoints/get-company-tree'
import { filterCompanyTreeById, filterCompanyTreeByQuery } from '@/utils/business/create-tree-data'
import { calculateTotalNodesLength } from '@/utils/business/tree-helper'

/**
 * Fetches the full tree of a specific company from the API.
 * @param {string} companyId - The ID of the company.
 * @throws {Error} If the company ID format is invalid.
 */
async function fetchGetCompanyTree(
  companyId: string,
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
): UseQueryResult<FullCompanyTreeReturn, unknown> {
  const queryClient = useQueryClient()
  const currentFilterIdActive = useDashboardStore((state) => state.currentFilterIdActive)
  const setIsReadyToRenderContent = useDashboardStore((state) => state.setIsReadyToRenderContent)
  const filterQuery = useDashboardStore((state) => state.filterQuery)

  function getCompanyTreeQueryFn(
    companyId?: string
  ): () => Promise<GetCompanyTreeResponse> {
    return () => (companyId ? fetchGetCompanyTree(companyId) : Promise.resolve({} as GetCompanyTreeResponse))
  }

  return useQuery({
    queryKey: ['getCompanyTree', companyId, currentFilterIdActive, filterQuery],
    queryFn: async () => {
      setIsReadyToRenderContent(false)

      const cachedData = queryClient.getQueryData<GetCompanyTreeResponse>(['getCompanyTree', companyId])

      let data: GetCompanyTreeResponse

      if (cachedData) {
        data = cachedData
      } else {
        data = await getCompanyTreeQueryFn(companyId)()
        queryClient.setQueryData(['getCompanyTree', companyId], data)
      }

      let filteredData = filterCompanyTreeById(data, currentFilterIdActive)

      if (filterQuery) {
        filteredData = filterCompanyTreeByQuery(filteredData, filterQuery)
      }

      return {
        tree: filteredData,
        totalTreeNodesCount: calculateTotalNodesLength(filteredData)
      }
    },
    onSuccess: () => {
      setIsReadyToRenderContent(true)
    },
    enabled: !!companyId,
  })
}

export default useGetCompanyTree
