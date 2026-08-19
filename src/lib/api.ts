import type {
  AppointmentDate,
  AppointmentHost,
  AppointmentRequest,
  AppointmentResponse,
  AppointmentType,
  BannerResponse,
  BullyRequest,
  ErrorResponse,
  EventResponse,
  MenuResponse,
  MetaResponse,
  PaginatedResponse,
  PostResponse,
} from '@/lib/models'

const POSTS_PER_PAGE = 12
const REVALIDATION = 60 * 60 * 24 // 24h
const TAG = { POSTS: 'posts', BANNERS: 'banners', MENUS: 'menus', EVENTS: 'events' } as const

async function fetchGet(path: string, config: NextFetchRequestConfig) {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)
  const response = await fetch(url, { method: 'GET', next: config })

  if (response.status === 500) {
    throw new Error(`Server error: GET ${response.url} (${response.statusText})`)
  }

  return response
}

async function fetchPost(path: string, body: object) {
  const url = new URL(path, process.env.NEXT_PUBLIC_API_URL)
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.status === 500) {
    throw new Error(`Server error: POST ${response.url} (${response.statusText})`)
  }

  return response
}

export async function getPosts(locale: string, page: string | number) {
  const response = await fetchGet(`/public/${locale}/posts?items=${POSTS_PER_PAGE}&page=${page}`,
    { revalidate: REVALIDATION, tags: [TAG.POSTS] },
  )

  if (response.status === 400) {
    return null
  }

  const data = await response.json() as PaginatedResponse<PostResponse>
  if (data.page > data.totalPages) {
    return null
  }

  return data
}

export async function getPostById(id: string) {
  const response = await fetchGet(`/public/posts/${id}`,
    { revalidate: REVALIDATION, tags: [`${TAG.POSTS}:${id}`] },
  )

  if (response.status === 404) {
    return null
  }

  return await response.json() as PostResponse
}

export async function getPostBySlug(locale: string, slug: string[]) {
  const path = slug.join('/')
  const response = await fetchGet(`/public/${locale}/posts/menu/${path}`,
    { revalidate: REVALIDATION, tags: [`${TAG.POSTS}:/${path}`] },
  )

  if (response.status === 404) {
    return null
  }

  return await response.json() as PostResponse
}

export async function getMenus(locale: string) {
  const response = await fetchGet(`/public/${locale}/menus`,
    { revalidate: REVALIDATION, tags: [TAG.MENUS] },
  )

  return await response.json() as MenuResponse[]
}

export async function getBanners(locale: string) {
  const response = await fetchGet(`/public/${locale}/featured`,
    { revalidate: REVALIDATION, tags: [TAG.BANNERS] },
  )

  return await response.json() as BannerResponse[]
}

export async function getEvents(locale: string) {
  if (locale !== 'lt') {
    return []
  }

  const response = await fetchGet(`/public/events/month/0`,
    { revalidate: REVALIDATION, tags: [TAG.EVENTS] },
  )

  return await response.json() as EventResponse[]
}

export async function getMenusMeta() {
  const response = await fetchGet('/public/meta/menus',
    { revalidate: REVALIDATION, tags: [TAG.MENUS] },
  )

  return await response.json() as MetaResponse[]
}

export async function getPostsMeta() {
  const response = await fetchGet('/public/meta/posts',
    { revalidate: REVALIDATION, tags: [TAG.POSTS] },
  )

  return await response.json() as MetaResponse[]
}

export async function getLocalesMeta() {
  const response = await fetchGet('/public/meta/locales',
    { revalidate: REVALIDATION, tags: [TAG.POSTS] },
  )

  return await response.json() as MetaResponse[]
}

export async function getAppointmentTypes() {
  const response = await fetchGet('/public/appointments/types',
    { revalidate: 0 },
  )

  return await response.json() as AppointmentType[]
}

export async function getAppointmentTeachers(typeId: number | string) {
  const response = await fetchGet(`/public/appointments/types/${typeId}/hosts`,
    { revalidate: 0 },
  )

  return await response.json() as AppointmentHost[]
}

export async function getAppointmentDates(typeId: number | string, hostId: number | string) {
  const response = await fetchGet(`/public/appointments/types/${typeId}/hosts/${hostId}/dates`,
    { revalidate: 0 },
  )

  return await response.json() as AppointmentDate[]
}

export async function registerAppointment(body: AppointmentRequest) {
  const response = await fetchPost('/public/appointments', body)

  return await response.json() as AppointmentResponse | ErrorResponse
}

export async function reportBully(body: BullyRequest) {
  const response = await fetchPost('/public/bully-reports', body)

  return await response.json() as Record<string, never> | ErrorResponse
}