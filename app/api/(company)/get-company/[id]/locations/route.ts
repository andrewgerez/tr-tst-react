import { env } from "@/services/env/env.service"
import { GetCompanyLocationsResponse, StructuredLocation } from "@/types/endpoints/get-company-locations"
import { NextResponse } from 'next/server'

/**
 * Handles GET requests to fetch company locations.
 * @param {Request} _ - The request object (not used).
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The company ID.
 * @returns {Promise<NextResponse>} The response containing the company locations.
 */
export async function GET(_: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    const response = await fetch(`${env.NEXT_PUBLIC_API}companies/${params.id}/locations`, {
      method: 'GET',
      headers,
    })

    const locations = await response.json()

    const formattedData = structureLocationsAndSubLocations(locations)

    return NextResponse.json(formattedData)
  } catch (error) {
    return NextResponse.json({ error: { message: 'API Error: Failed to get locations', error } }, { status: 500 })
  }
}

/**
 * Structures locations and their sub-locations into a hierarchical format.
 * Locations with children are returned first in the array.
 * @param {GetCompanyLocationsResponse} locations - The array of locations to structure.
 */
function structureLocationsAndSubLocations(locations: GetCompanyLocationsResponse): StructuredLocation[] {
  const structuredLocations: Record<string, StructuredLocation> = {}

  locations.forEach((location) => {
    if (!location.parentId) {
      structuredLocations[location.id] = {
        id: location.id,
        name: location.name,
        children: [],
      }
    }
  })

  locations.forEach((location) => {
    if (location.parentId) {
      if (!structuredLocations[location.parentId]) {
        structuredLocations[location.parentId] = {
          id: location.parentId,
          name: '',
          children: [],
        }
      }

      structuredLocations[location.parentId].children.push(location)

      structuredLocations[location.id] = {
        id: location.id,
        name: location.name,
        children: [],
      }
    }
  })

  const resultArray = Object.values(structuredLocations).sort((a, b) => {
    if (a.children.length > 0 && b.children.length === 0) {
      return -1
    }

    if (a.children.length === 0 && b.children.length > 0) {
      return 1
    }

    return 0
  })

  return resultArray
}
