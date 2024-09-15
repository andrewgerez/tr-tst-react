import NetworkService from '@/services/network/network.service'
import { Endpoints } from '@/enums'
import { Companies } from '@/types/endpoints/get-companies'
import { GetCompanyAssetsResponse } from '@/types/endpoints/get-company-assets'
import { GetCompanyLocationsResponse } from '@/types/endpoints/get-company-locations'
import { GetCompanyTreeResponse } from '@/types/endpoints/get-company-tree'

/**
 * Service class for making API calls.
 */
class APIService {
  private static instance: APIService

  private networkService: NetworkService

  private constructor() {
    this.networkService = NetworkService.getInstance()
  }

  /**
   * Gets the singleton instance of the APIService.
   * @returns {APIService} The singleton instance of the APIService.
   */
  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService()
    }

    return APIService.instance
  }

  /**
   * Fetches the list of companies.
   * @returns {Promise<Companies>} A promise that resolves to the
   * list of companies.
   */
  public async getCompanies(): Promise<Companies> {
    return await this.networkService.get<Companies>(Endpoints.GET_COMPANIES)
  }

  /**
   * Fetches the locations of a specific company.
   * @param {string} companyId - The ID of the company.
   * @returns {Promise<GetCompanyLocationsResponse>} A promise that resolves to
   * the list of company locations.
   */
  public async getCompanyLocations(companyId: string): Promise<GetCompanyLocationsResponse> {
    return await this.networkService.get<GetCompanyLocationsResponse>(
      `${Endpoints.GET_COMPANY}/${companyId}/${Endpoints.GET_LOCATIONS}`
    )
  }

  /**
   * Fetches the assets of a specific company.
   * @param {string} companyId - The ID of the company.
   * @returns {Promise<GetCompanyAssetsResponse>} A promise that resolves to
   * the list of company assets.
   */
  public async getCompanyAssets(companyId: string): Promise<GetCompanyAssetsResponse> {
    return await this.networkService.get<GetCompanyAssetsResponse>(
      `${Endpoints.GET_COMPANY}/${companyId}/${Endpoints.GET_ASSETS}`
    )
  }

    /**
   * Fetches the full tree of a specific company.
   * @param {string} companyId - The ID of the company.
   * @returns {Promise<any>} A promise that resolves to the full tree of the company.
   */
    public async getCompanyTree(companyId: string): Promise<GetCompanyTreeResponse> {
      return await this.networkService.get<GetCompanyTreeResponse>(
        `${Endpoints.GET_COMPANY}/${companyId}/${Endpoints.GET_TREE}`
      )
    }
}

export default APIService
