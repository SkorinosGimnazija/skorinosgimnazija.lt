export interface IBanner {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  imageUrl: string;
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
  isExternal: boolean;
  children?: IMenu[] | null;
}

export interface IEvent {
  id: string;
  title: string;
  allDay: boolean;
  startDate?: string | null;
  endDate?: string | null;
}

export interface IMeta {
  url: string;
  ln: string;
  date: string;
}

export interface IAppointmentHost {
  userName: string;
  displayName: string;
}

export interface IAppointmentType {
  id: number;
  name: string;
  registrationEndsAt: string;
}

export interface IAppointmentDate {
  id: number;
  date: string;
}

export interface IAppointmentRegistration {
  captchaToken: string;
  dateId: number;
  hostId: number;
  typeId: number;
  name: string;
  email: string;
  note: string;
}

export interface IAppointmentRegistrationResponse {
  id: string;
  dateId: number;
  hostId: number;
}

export interface IApiErrorResponse {
  title: string;
  status: number;
  errors: {
    [key: string]: string[];
  };
}