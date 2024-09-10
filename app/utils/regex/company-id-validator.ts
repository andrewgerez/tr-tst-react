/**
 * Validates if the given companyId is in the correct format.
 * @param companyId - The company ID to validate.
 * @returns True if the companyId is valid, otherwise false.
 */
export function isValidCompanyId(companyId: string): boolean {
  const regex = /^[a-f0-9]{24}$/
  return regex.test(companyId)
}
