import { env } from "@/services/env/env.service"
import { NextResponse } from 'next/server'

/**
 * Handles GET requests to fetch company assets.
 * @param {Request} _ - The request object (not used).
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.id - The company ID.
 * @returns {Promise<NextResponse>} The response containing the company assets.
 */
export async function GET(_: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    const response = await fetch(`${env.NEXT_PUBLIC_API}companies/${params.id}/assets`, {
      method: 'GET',
      headers,
    })

    const assets = await response.json()

    return NextResponse.json(assets)
  } catch (error) {
    return NextResponse.json({ error: { message: 'API Error: Failed to get assets', error } }, { status: 500 })
  }
}
