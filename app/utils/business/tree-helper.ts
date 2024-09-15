import { ExtendedCompanyAsset, LocationWithAssets } from "@/types/endpoints/get-company-tree"

export function isAsset(node: any): node is ExtendedCompanyAsset {
  return 'sensorType' in node && 'locationId' in node && 'parentId' in node
}

export function isIsolatedComponent(
  node: LocationWithAssets | ExtendedCompanyAsset
): boolean {
  return node.components?.length === 1 && node.name === node.components[0].name
}

export function isExtendedCompanyAsset(
  node: LocationWithAssets | ExtendedCompanyAsset
): node is ExtendedCompanyAsset {
  return 'status' in node
}
