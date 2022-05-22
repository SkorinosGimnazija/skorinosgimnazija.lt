export interface ILanguage {
  id: number;
  name: string;
  slug: string;
}

export interface IBanner {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  isPublished: boolean;
  pictureUrl: string;
  order: number;
  language: ILanguage;
}

export interface IPost {
  id: number;
  isFeatured: boolean;
  isPublished: boolean;
  showInFeed: boolean;
  publishedAt: string;
  modifiedAt?: string | null;
  language: ILanguage;
  slug: string;
  title: string;
  introText?: string | null;
  text?: string | null;
  meta?: string | null;
  featuredImage?: string | null;
  images?: string[];
}

export interface IMenu {
  id: number;
  order: number;
  url?: string | null;
  title: string;
  slug: string;
  position: string;
  path: string;
  isPublished: boolean;
  parentMenuId?: number | null;
  childMenus: IMenu[];
}

export interface IEvent {
  id: string;
  title: string;
  startDate?: string | null;
  startDateTime?: string | null;
  endDate?: string | null;
  endDateTime?: string | null;
}

export interface IMeta {
  url: string;
  ln: string;
  date: string;
}
