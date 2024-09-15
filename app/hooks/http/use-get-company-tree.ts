import APIService from '@/services/api/api.service'
import useDashboardStore from '@/store/dashboard'
import { useQuery, UseQueryResult } from 'react-query'
import { isValidCompanyId } from '@/utils/regex/company-id-validator'
import { GetCompanyTreeResponse, LocationWithAssets } from '@/types/endpoints/get-company-tree'
import { TreeElementType } from '@/enums/business'

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

function filterCompanyTree(locations: LocationWithAssets[], sensorFilter: string | null): LocationWithAssets[] {
  if (!sensorFilter) return locations

  const filterLocationRecursively = (location: LocationWithAssets): LocationWithAssets | null => {
    if (location.type === TreeElementType.COMPONENT) {
      const isolatedComponent = location.components && location.components?.[0]
      const matchesComponent =
        (sensorFilter === 'energy' && isolatedComponent?.sensorType === 'energy') ||
        (sensorFilter === 'alert' && isolatedComponent?.status === 'alert')

      return matchesComponent ? location : null
    }

    const filteredAssets = location.assets.filter(asset => {
      const matchesAsset =
        (sensorFilter === 'energy' && asset.sensorType === 'energy') ||
        (sensorFilter === 'alert' && asset.status === 'alert')

      const matchesComponent = asset.components?.some(component =>
        (sensorFilter === 'energy' && component.sensorType === 'energy') ||
        (sensorFilter === 'alert' && component.status === 'alert')
      )

      return matchesAsset || matchesComponent
    })

    const filteredChildren = location.children
      .map(filterLocationRecursively)
      .filter(child => child !== null) as LocationWithAssets[]

    const hasMatchingAssetsOrChildren = filteredAssets.length > 0 || filteredChildren.length > 0

    if (hasMatchingAssetsOrChildren) {
      return {
        ...location,
        assets: filteredAssets,
        children: filteredChildren,
      }
    }

    return null
  }

  return locations
    .map(filterLocationRecursively)
    .filter(location => location !== null) as LocationWithAssets[]
}

/**
 * Custom hook to fetch and cache the full tree of a specific company using react-query.
 * @param {string} companyId - The ID of the company.
 */
function useGetCompanyTree(
  companyId?: string
): UseQueryResult<GetCompanyTreeResponse, unknown> {
  const { currentFilterIdActive, setIsReadyToRenderContent } = useDashboardStore()

  function getCompanyTreeQueryFn(
    companyId?: string
  ): () => Promise<GetCompanyTreeResponse> {
    return () => (companyId ? fetchGetCompanyTree(companyId) : Promise.resolve({} as GetCompanyTreeResponse))
  }

  return useQuery({
    queryKey: ['getCompanyTree', companyId, currentFilterIdActive],
    queryFn: async () => {
      setIsReadyToRenderContent(false)
      const data = await getCompanyTreeQueryFn(companyId)()
      const filteredData = filterCompanyTree(data, currentFilterIdActive)

      return filteredData
    },
    onSuccess: () => {
      setIsReadyToRenderContent(true)
    },
    enabled: !!companyId,
  })
}

export default useGetCompanyTree
