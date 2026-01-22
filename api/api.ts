import type {
  IApiErrorResponse,
  IAppointmentDate,
  IAppointmentHost,
  IAppointmentRegistration,
  IAppointmentRegistrationResponse,
  IAppointmentType,
  IBanner,
  IBullyReport,
  IEvent,
  IMenu,
  IMeta,
  IPost,
} from '../models/models';

class Api {
  private async fetch(url: string, data?: RequestInit) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data);
    if (!request.ok) {
      console.error(request.url, request.status, request.statusText);
      throw 'Server error';
    }

    return await request.json();
  }

  private async fetchPost<T>(url: string, body: unknown) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (request.status == 500) {
      return null;
    }

    return (await request.json()) as T | IApiErrorResponse;
  }

  public async getPosts(locale: string, page: number) {
    const postsPerPage = 12;

    try {
      const posts = await this.fetch(`/public/${locale}/posts/?items=${postsPerPage}&page=${page}`);
      return posts.items as IPost[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getPostById(id: string) {
    try {
      const posts = await this.fetch(`/public/posts/${id}`);
      return posts as IPost;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getPostByPath(locale: string, path: string[] | string) {
    try {
      const encodedPath = encodeURIComponent(Array.isArray(path) ? path.join('/') : path);
      const post = await this.fetch(`/public/${locale}/posts/menu/${encodedPath}`);
      return post as IPost[];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getMenus(locale: string) {
    try {
      const menuItems = await this.fetch(`/public/${locale}/menus`);
      return menuItems as IMenu[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getBanners(locale: string) {
    try {
      const banners = await this.fetch(`/public/${locale}/featured`);
      return banners as IBanner[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getEvents(week: number) {
    try {
      const events = await this.fetch(`/public/events/week/${week}`);
      return events as IEvent[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getMenusMeta() {
    try {
      const menus = await this.fetch('/public/meta/menus');
      return menus as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getPostsMeta() {
    try {
      const posts = await this.fetch('/public/meta/posts');
      return posts as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getLocalesMeta() {
    try {
      const locales = await this.fetch('/public/meta/locales');
      return locales as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getAppointmentTypes() {
    try {
      const types = await this.fetch(`/public/appointments/types`);
      return types as IAppointmentType[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getAppointmentTeachers(typeId: number | string) {
    try {
      const hosts = await this.fetch(`/public/appointments/types/${typeId}/hosts`);
      return hosts as IAppointmentHost[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getAppointmentDates(typeId: number | string, hostId: number | string) {
    try {
      const dates = await this.fetch(`/public/appointments/types/${typeId}/hosts/${hostId}/dates`);
      return dates as IAppointmentDate[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async registerAppointment(body: IAppointmentRegistration) {
    try {
      return  await this.fetchPost<IAppointmentRegistrationResponse>('/public/appointments', body);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async reportBully(body: IBullyReport) {
    try {
      return await this.fetchPost<void>('/public/bully-reports', body);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const api = new Api();