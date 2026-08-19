import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

interface RevalidationRequest {
  tag: string
  slug?: string
  id?: string
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (!secret || secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const data = await request.json() as RevalidationRequest

  revalidateTag(data.tag, { expire: 0 })

  if (data.slug) {
    revalidateTag(`${data.tag}:${data.slug}`, { expire: 0 })
  }

  if (data.id) {
    revalidateTag(`${data.tag}:${data.id}`, { expire: 0 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}