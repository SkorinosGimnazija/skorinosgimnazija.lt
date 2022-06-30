export interface IBanner {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  pictureUrl: string;
}

export interface IPost {
  id: number;
  publishedAt: string;
  modifiedAt?: string | null;
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
  url?: string | null;
  title: string;
  slug: string;
  position: 'side' | 'footer';
  path: string;
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
