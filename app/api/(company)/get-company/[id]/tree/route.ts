import { env } from '@/services/env/env.service'
import { combineLocationsAndAssets } from '@/utils/business/create-tree-data'
import { NextResponse } from 'next/server'

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
