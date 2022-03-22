export interface Language {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishedAt: string;
  modifiedAt?: string | null;
  language: Language;
  slug: string;
  title: string;
  introText?: string | null;
  meta?: string | null;
  featuredImage?: string | null;
}

export interface Menu {
  id: number;
  order: number;
  url?: string | null;
  title: string;
  slug: string;
  position: string;
  path: string;
  isPublished: boolean;
  parentMenuId?: number | null;
  childMenus: Menu[];
}
