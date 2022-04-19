import { IBanner, IEvent, IMenu, IPost } from '../models/models';

class Api {
  private async fetch(url: string) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    if (!request.ok) {
      return null;
    }
    const response = await request.json();
    return response;
  }

  public async getPosts(locale: string) {
    const posts = await this.fetch(`/posts/public/${locale}/all`);
    return posts as IPost[];
  }

  public async getPostById(id: string) {
    const posts = await this.fetch(`/posts/public/${id}`);
    return posts as IPost;
  }

  public async getPostByPath(locale: string, path: string[] | string) {
    const encodedPath = encodeURIComponent(Array.isArray(path) ? path.join('/') : path);
    const menus = await this.fetch(`/posts/public/${locale}/${encodedPath}`);
    return menus as IPost[];
  }

  public async getMenus(locale: string) {
    const menus = await this.fetch(`/menus/public/${locale}`);
    return menus as IMenu[];
  }

  public async getBanners(locale: string) {
    const menus = await this.fetch(`/banners/public/${locale}`);
    return menus as IBanner[];
  }

  public async getEvents(week: number) {
    return [];
    const events = await this.fetch(`/events/public/${week}`);
    return events as IEvent[];
  }
}

export const api = new Api();
