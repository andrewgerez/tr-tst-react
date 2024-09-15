import axios, { AxiosInstance } from 'axios'
import { env } from '@/services/env/env.service'

/**
 * Service class for making network requests using Axios.
 */
class NetworkService {
  private static instance: NetworkService

  private network: AxiosInstance
  private static axiosConfig = {
    baseURL: env.NEXT_PUBLIC_BFF_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  private constructor() {
    this.network = axios.create(NetworkService.axiosConfig)
  }

  /**
   * Gets the singleton instance of the NetworkService.
   * @returns {NetworkService} The singleton instance of the NetworkService.
   */
  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService()
    }

    return NetworkService.instance
  }

  /**
   * Makes a GET request to the specified endpoint.
   * @param endpoint - The endpoint to make the GET request to.
   * @returns A promise that resolves to the response data.
   */
  public async get<T>(endpoint: string): Promise<T> {
    return (await this.network.get(endpoint)).data
  }
}

export default NetworkService
