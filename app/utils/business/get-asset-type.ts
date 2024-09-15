/**
 * Mapping of keywords to asset types.
 * @type {Object.<string, string>}
 */
const typeKeyMap: { [key: string]: string } = {
  motor: 'Motor Elétrico (Trifásico)',
  sensor: 'Sensor de Vibração Industrial',
}

/**
 * Gets the mapped name of an asset based on keywords.
 *
 * @param {string} name - The name of the asset.
 * @returns {string} - The mapped type of the asset, or the original name if no keyword is found.
 */
export function getAssetType(name: string): string {
  const lowerCaseName = name.toLowerCase()

  for (const key in typeKeyMap) {
    if (lowerCaseName.includes(key)) {
      return typeKeyMap[key]
    }
  }

  return name
}
