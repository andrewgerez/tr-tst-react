import { ExtendedCompanyAsset, LocationWithAssets } from "@/types/endpoints/get-company-tree"

/**
 * Checks if the given node is an ExtendedCompanyAsset.
 * @param {ExtendedCompanyAsset} node - The node to check.
 * @returns {node is ExtendedCompanyAsset} - True if the node is an ExtendedCompanyAsset, false otherwise.
 */
export function isAsset(node: ExtendedCompanyAsset): node is ExtendedCompanyAsset {
  return 'sensorType' in node && 'locationId' in node && 'parentId' in node
}

/**
 * Checks if the given node is an isolated component.
 * @param {LocationWithAssets | ExtendedCompanyAsset} node - The node to check.
 * @returns {boolean} - True if the node is an isolated component, false otherwise.
 */
export function isIsolatedComponent(
  node: LocationWithAssets | ExtendedCompanyAsset
): boolean {
  return node.components?.length === 1 && node.name === node.components[0].name
}

/**
 * Checks if the given node is an ExtendedCompanyAsset.
 * @param {LocationWithAssets | ExtendedCompanyAsset} node - The node to check.
 * @returns {node is ExtendedCompanyAsset} - True if the node is an ExtendedCompanyAsset, false otherwise.
 */
export function isExtendedCompanyAsset(
  node: LocationWithAssets | ExtendedCompanyAsset
): node is ExtendedCompanyAsset {
  return 'status' in node
}

/**
 * Calculates the total length of nodes, including their assets, sub-assets, and children.
 * @param {(LocationWithAssets | ExtendedCompanyAsset)[]} nodes - The array of nodes to calculate the total length for.
 * @returns {number} - The total length of nodes.
 */
export function calculateTotalNodesLength(
  nodes: (LocationWithAssets | ExtendedCompanyAsset)[]
): number {
  return nodes.reduce((total, node) => {
    let count = 1

    if ('assets' in node && node.assets?.length > 0) {
      count += calculateTotalNodesLength(node.assets)
    }

    if ('subAssets' in node && (node.subAssets ?? []).length > 0) {
      count += calculateTotalNodesLength(node.subAssets ?? [])
    }

    if ('children' in node && node.children?.length > 0) {
      count += calculateTotalNodesLength(node.children)
    }

    return total + count
  }, 0)
}
