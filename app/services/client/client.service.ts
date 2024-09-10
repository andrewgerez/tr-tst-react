import { QueryClient } from 'react-query'

/**
 * Creates a new instance of QueryClient with default options.
 * 
 * @type {QueryClient}
 * @property {object} defaultOptions - Default options for the QueryClient.
 * @property {object} defaultOptions.queries - Default options for queries.
 * @property {boolean} defaultOptions.queries.refetchOnWindowFocus - Whether queries should refetch on window focus.
 */
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default queryClient
