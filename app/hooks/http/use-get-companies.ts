import APIService from '@/services/api/api.service'
import { Companies } from '@/types/endpoints/get-companies'
import { useQuery, UseQueryResult } from 'react-query'

/**
 * Fetches the list of companies from the API.
 */
async function fetchGetCompanies(): Promise<Companies> {
  return await APIService.getInstance().getCompanies()
}

/**
 * Custom hook to fetch and cache the list of companies using react-query.
 */
function useGetCompanies(): UseQueryResult<Companies, unknown> {
  return useQuery({
    queryKey: ['companies'],
    queryFn: fetchGetCompanies,
    cacheTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 5,  // 5 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 1000,
  })
}

export default useGetCompanies
