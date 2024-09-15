import { SensorType, TreeElementType } from '@/enums/business'
import { env } from '@/services/env/env.service'
import { CompanyAsset } from '@/types/endpoints/get-company-assets'
import { CompanyLocation } from '@/types/endpoints/get-company-locations'
import { FullCompanyTree, LocationWithAssets } from '@/types/endpoints/get-company-tree'
import { NextResponse } from 'next/server'
import { ExtendedCompanyAsset } from './types'

/**
 * Handles GET requests to fetch the full company tree.
 * @param {Request} _ - The request object (not used).
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The company ID.
 * @returns {Promise<NextResponse>} The response containing the company tree.
 */
export async function GET(_: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const headers = { 'Content-Type': 'application/json' }

    const [locations, assets] = await Promise.all([
      fetch(`${env.NEXT_PUBLIC_API}companies/${params.id}/locations`, { method: 'GET', headers }).then(res => res.json()),
      fetch(`${env.NEXT_PUBLIC_API}companies/${params.id}/assets`, { method: 'GET', headers }).then(res => res.json())
    ])

    const combinedData = combineLocationsAndAssets(locations, assets)
    return NextResponse.json(combinedData)
  } catch (error) {
    return NextResponse.json({ error: { message: 'API Error: Failed to get the company tree.', error } }, { status: 500 })
  }
}

/**
 * Combines locations and assets into a hierarchical structure.
 * @param {CompanyLocation[]} locations - The array of locations.
 * @param {CompanyAsset[]} assets - The array of assets.
 * @returns {LocationWithAssets[]} The combined hierarchical structure of locations and assets.
 */
function combineLocationsAndAssets(locations: CompanyLocation[], assets: CompanyAsset[]): FullCompanyTree {
  const locationMap = createLocationMap(locations)
  const { assetMap, isolatedComponents } = addAssetsAndComponents(locationMap, assets)
  const structuredLocations = organizeLocations(locations, locationMap, assetMap)

  if (isolatedComponents.length > 0) {
    structuredLocations.push(
      ...isolatedComponents.map((component) => ({
        id: component.id,
        name: component.name,
        assets: [],
        children: [],
        components: [component],
        parentId: null,
        type: TreeElementType.COMPONENT,
      }))
    )
  }

  return structuredLocations
}


/**
 * Creates a map of locations with initial structure.
 * @param {CompanyLocation[]} locations - The array of locations.
 * @returns {Record<string, LocationWithAssets>} A map of location IDs to their corresponding hierarchical structure.
 */
function createLocationMap(locations: CompanyLocation[]): Record<string, LocationWithAssets> {
  return locations.reduce((map, location) => {
    map[location.id] = { ...location, assets: [], children: [], type: TreeElementType.LOCATION }
    return map
  }, {} as Record<string, LocationWithAssets>)
}

/**
 * Determines if an asset is a component.
 * An asset is considered a component if it has a sensorType or if its name contains "vibration" and its status is "operating" or "alert".
 * @param {CompanyAsset} asset - The asset to check.
 * @returns {boolean} True if the asset is a component, otherwise false.
 */
function isComponent(asset: CompanyAsset): boolean {
  return (
    asset.sensorType !== null ||
    (asset.name.toLowerCase().includes('vibration') &&
      (asset.status === 'operating' || asset.status === 'alert'))
  )
}

/**
 * Adds assets and components to their corresponding locations or assets in the location map.
 * @param {Record<string, LocationWithAssets>} locationMap - The map of locations with initial structure.
 * @param {CompanyAsset[]} assets - The array of assets.
 * @returns {Record<string, ExtendedCompanyAsset>} A map of asset IDs to their corresponding extended assets.
 */
function addAssetsAndComponents(
  locationMap: Record<string, LocationWithAssets>,
  assets: CompanyAsset[]
): { assetMap: Record<string, ExtendedCompanyAsset>; isolatedComponents: ExtendedCompanyAsset[] } {
  const assetMap: Record<string, ExtendedCompanyAsset> = {}
  const isolatedComponents: ExtendedCompanyAsset[] = []

  assets.forEach((asset) => {
    const extendedAsset: ExtendedCompanyAsset = {
      ...asset,
      sensorType: asset.sensorType,
      type: TreeElementType.ASSET,
      components: [],
      subAssets: [],
    }

    assetMap[asset.id] = extendedAsset

    if (asset.locationId && locationMap[asset.locationId]) {
      locationMap[asset.locationId].assets.push(extendedAsset)
    }
  })

  assets.forEach((asset) => {
    const extendedAsset = assetMap[asset.id]

    if (asset.parentId && assetMap[asset.parentId]) {
      const parentAsset = assetMap[asset.parentId]
      parentAsset.subAssets?.push(extendedAsset)
    }

    if (isComponent(asset)) {
      extendedAsset.type = TreeElementType.COMPONENT

      if (asset.parentId && assetMap[asset.parentId]) {
        const parentAsset = assetMap[asset.parentId]
        parentAsset.components?.push(extendedAsset)
      }
    }

    if (!asset.parentId && !asset.locationId && isComponent(asset)) {
      isolatedComponents.push(extendedAsset)
    }
  })

  return { assetMap, isolatedComponents }
}

/**
 * Organizes locations into structured and empty lists based on their assets and children.
 * @param {CompanyLocation[]} locations - The array of locations.
 * @param {Record<string, LocationWithAssets>} locationMap - The map of locations with their assets and children.
 * @param {Record<string, ExtendedCompanyAsset>} assetMap - The map of asset IDs to their corresponding extended assets.
 * @returns {LocationWithAssets[]} The combined hierarchical structure of locations and assets.
 */
function organizeLocations(
  locations: CompanyLocation[],
  locationMap: Record<string, LocationWithAssets>,
  assetMap: Record<string, ExtendedCompanyAsset>
): LocationWithAssets[] {
  const structuredLocations: LocationWithAssets[] = []
  const emptyLocations: LocationWithAssets[] = []

  locations.forEach((location) => {
    const loc = locationMap[location.id]
    if (!location.parentId) {
      if (loc.assets.length === 0 && loc.children.length === 0) {
        emptyLocations.push(loc)
      } else {
        structuredLocations.push(loc)
      }
    } else if (locationMap[location.parentId]) {
      locationMap[location.parentId].children.push(loc)
    }
  })

  return [...structuredLocations, ...emptyLocations]
}
