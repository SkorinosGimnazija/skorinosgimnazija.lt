import { IBanner, IEvent, IMenu, IMeta, IPost } from '../models/models';

class Api {
  private async fetch(url: string) {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    if (!request.ok) {
      return null;
    }
    const response = await request.json();
    return response;
  }

  public async getPosts(locale: string, items: number, page: number) {
    try {
      const posts = await this.fetch(`/posts/public/${locale}/all?items=${items}&page=${page}`);
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
}

export const api = new Api();
