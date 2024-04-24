import {
  IApiErrorResponse,
  IAppointmentDate,
  IAppointmentHost,
  IAppointmentRegistration,
  IAppointmentRegistrationResponse,
  IBanner,
  IEvent,
  IMenu,
  IMeta,
  IPost,
} from '../models/models';

class Api {
  private async fetch(url: string, data?: RequestInit) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, data);
    if (!request.ok) {
      throw 'Server error';
    }
    const response = await request.json();
    return response;
  }

  private async fetchPost(url: string, body: unknown) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    return response;
  }

  public async getPosts(locale: string, page: number) {
    const postsPerPage = 12;

    try {
      const posts = await this.fetch(
        `/posts/public/${locale}/all?items=${postsPerPage}&page=${page}`
      );
      return posts as IPost[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getPostById(id: string) {
    try {
      const posts = await this.fetch(`/posts/public/${id}`);
      return posts as IPost;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getPostByPath(locale: string, path: string[] | string) {
    try {
      const encodedPath = encodeURIComponent(Array.isArray(path) ? path.join('/') : path);
      const post = await this.fetch(`/posts/public/${locale}/${encodedPath}`);
      return post as IPost[];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getMenus(locale: string) {
    try {
      const menus = await this.fetch(`/menus/public/${locale}`);
      return menus as IMenu[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getBanners(locale: string) {
    try {
      const banners = await this.fetch(`/banners/public/${locale}`);
      return banners as IBanner[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getEvents(week: number) {
    try {
      const events = await this.fetch(`/events/public/${week}`);
      return events as IEvent[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getMenusMeta() {
    try {
      const menus = await this.fetch('/meta/menus');
      return menus as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getPostsMeta() {
    try {
      const posts = await this.fetch('/meta/posts');
      return posts as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getLocalesMeta() {
    try {
      const locales = await this.fetch('/meta/locales');
      return locales as IMeta[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getAppointmentTeachers(slug: string) {
    try {
      const hosts = await this.fetch(`/appointments/public/hosts/available/${slug}`);
      return hosts as IAppointmentHost[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getAppointmentDates(slug: string, teacher: string) {
    try {
      const hosts = await this.fetch(`/appointments/public/dates/available/${slug}/${teacher}`);
      return hosts as IAppointmentDate[];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async registerAppointment(body: IAppointmentRegistration) {
    try {
      const appointment = await this.fetchPost('/appointments/public/create', body);
      return appointment as IAppointmentRegistrationResponse & IApiErrorResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const api = new Api();
