export interface BannerResponse {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  imageUrl: string;
}

export interface PostResponse {
  id: number;
  publishedAt: string;
  modifiedAt?: string | null;
  slug: string;
  title: string;
  introText?: string | null;
  text?: string | null;
  meta?: string | null;
  featuredImage?: string | null;
  menuUrl?: string | null;
  images?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  totalItems: number;
  totalPages: number;
}

interface MenuResponseWithChildren {
  id: number;
  title: string;
  children: MenuResponse[];
}

interface MenuResponseWithoutChildren {
  id: number;
  url: string;
  title: string;
  children?: null;
}

export type MenuResponse = MenuResponseWithChildren | MenuResponseWithoutChildren

export interface EventResponse {
  id: string;
  title: string;
  allDay: boolean;
  startDate: string;
  endDate: string;
}

export interface MetaResponse {
  url: string;
  ln: string;
  date: string;
}

export interface AppointmentHost {
  id: number;
  name: string;
  normalizeName: string;
}

export interface AppointmentType {
  id: number;
  description: string;
}

export interface AppointmentDate {
  id: number;
  date: string;
}

export interface AppointmentRequest {
  captchaToken: string;
  dateId: number;
  hostId: number;
  typeId: number;
  name: string;
  email: string;
  note: string;
}

export interface BullyRequest {
  captchaToken: string;
  victimName: string;
  bullyName: string;
  location: string;
  details: string;
  observers?: string;
  date: string;
}

export interface AppointmentResponse {
  id: string;
  dateId: number;
  date: string;
  hostId: number;
  hostName: string;
}

export interface ErrorResponse {
  title: string;
  detail: string;
  status: number;
  errors: { name: string, reason: string }[]
}