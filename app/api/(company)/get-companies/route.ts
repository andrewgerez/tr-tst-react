import { env } from '@/services/env/env.service'
import { NextResponse } from 'next/server'

/**
 * Handles GET requests to fetch the list of companies.
 * @returns {Promise<NextResponse>} The response containing the list of companies.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const headers = {
      'Content-Type': 'application/json',
    }

    const companies = await fetch(`${env.NEXT_PUBLIC_API}companies`, {
      method: 'GET',
      headers,
    })

    const data = await companies.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: { message: 'API Error: Failed to get companies', error } }, { status: 500 })
  }
}
