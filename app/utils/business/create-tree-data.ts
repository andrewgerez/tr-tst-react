import { SensorStatus, SensorType, TreeElementType } from '@/enums/business'
import { CompanyAsset } from '@/types/endpoints/get-company-assets'
import { CompanyLocation } from '@/types/endpoints/get-company-locations'
import { FullCompanyTree, LocationWithAssets, ExtendedCompanyAsset } from '@/types/endpoints/get-company-tree'

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
 * An asset is considered a component if it has a sensorType or if its name contains "vibration" and its status
 * is "operating" or "alert".
 * @param {CompanyAsset} asset - The asset to check.
 * @returns {boolean} True if the asset is a component, otherwise false.
 */
function isComponent(asset: CompanyAsset): boolean {
  return (
    asset.sensorType !== null ||
    (asset.name.toLowerCase().includes(SensorType.VIBRATION) &&
      (asset.status === SensorStatus.OPERATING || asset.status === SensorStatus.ALERT))
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

/**
 * Combines locations and assets into a hierarchical structure.
 * @param {CompanyLocation[]} locations - The array of locations.
 * @param {CompanyAsset[]} assets - The array of assets.
 * @returns {LocationWithAssets[]} The combined hierarchical structure of locations and assets.
 */
export function combineLocationsAndAssets(
  locations: CompanyLocation[],
  assets: CompanyAsset[]
): FullCompanyTree {
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
 * Filters the company tree based on the provided sensor filter.
 * @param {LocationWithAssets[]} locations - The array of locations with assets.
 * @param {string | null} sensorFilter - The sensor filter to apply (e.g., 'energy', 'alert').
 * @returns {LocationWithAssets[]} - The filtered array of locations with assets.
 */
export function filterCompanyTreeById(
  locations: LocationWithAssets[],
  sensorFilter: string | null
): LocationWithAssets[] {
  if (!sensorFilter) return locations

  const filterLocationRecursively = (location: LocationWithAssets): LocationWithAssets | null => {
    if (location.type === TreeElementType.COMPONENT) {
      const isolatedComponent = location.components && location.components?.[0]
      const matchesComponent =
        (sensorFilter === SensorType.ENERGY && isolatedComponent?.sensorType === SensorType.ENERGY) ||
        (sensorFilter === SensorStatus.ALERT && isolatedComponent?.status === SensorStatus.ALERT)

      return matchesComponent ? location : null
    }

    const filteredAssets = location.assets.filter(asset => {
      const matchesAsset =
        (sensorFilter === SensorType.ENERGY && asset.sensorType === SensorType.ENERGY) ||
        (sensorFilter === SensorStatus.ALERT && asset.status === SensorStatus.ALERT)

      const matchesComponent = asset.components?.some(component =>
        (sensorFilter === SensorType.ENERGY && component.sensorType === SensorType.ENERGY) ||
        (sensorFilter === SensorStatus.ALERT && component.status === SensorStatus.ALERT)
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
 * Filters the company tree based on the provided query string.
 * @param {LocationWithAssets[]} locations - The array of locations with assets.
 * @param {string | null} query - The query string to filter locations by name.
 * @returns {LocationWithAssets[]} - The filtered array of locations with assets.
 */
export function filterCompanyTreeByQuery(
  locations: LocationWithAssets[],
  query: string | null
): LocationWithAssets[] {
  if (!query) return locations

  const lowerCaseQuery = query.toLowerCase()

  const filterLocationRecursively = (location: LocationWithAssets): LocationWithAssets | null => {
    const matchesLocationName = location.name.toLowerCase().includes(lowerCaseQuery)

    const filterAssetsRecursively = (asset: ExtendedCompanyAsset): ExtendedCompanyAsset | null => {
      const matchesAssetName = asset.name.toLowerCase().includes(lowerCaseQuery)

      if (matchesAssetName) {
        return {
          ...asset,
          components: asset.components,
          subAssets: asset.subAssets,
        }
      }

      const filteredComponents = asset.components?.filter(component =>
        component.name.toLowerCase().includes(lowerCaseQuery)
      ) || []

      const filteredSubAssets = asset.subAssets?.map(filterAssetsRecursively)
        .filter(subAsset => subAsset !== null) || []

      const hasMatchingComponentsOrSubAssets = filteredComponents.length > 0 || filteredSubAssets.length > 0

      if (matchesAssetName || hasMatchingComponentsOrSubAssets) {
        return {
          ...asset,
          components: filteredComponents,
          subAssets: filteredSubAssets,
        }
      }

      return null
    }

    if (matchesLocationName) {
      return {
        ...location,
        assets: location.assets,
        children: location.children,
      }
    }

    const filteredAssets = location.assets.map(filterAssetsRecursively).filter(asset => asset !== null)

    const filteredChildren = location.children
      .map(filterLocationRecursively)
      .filter(child => child !== null) as LocationWithAssets[]

    const hasMatchingAssetsOrChildren = filteredAssets.length > 0 || filteredChildren.length > 0

    if (matchesLocationName || hasMatchingAssetsOrChildren) {
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
