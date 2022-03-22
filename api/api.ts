import { Menu, Post } from '../models/models';

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
    return posts as Post[];
  }

  public async getPostByPath(locale: string, path: string[] | string) {
    const encodedPath = encodeURIComponent(Array.isArray(path) ? path.join('/') : path);
    const menus = await this.fetch(`/posts/public/${locale}/${encodedPath}`);
    return menus as Post[];
  }

  public async getMenus(locale: string) {
    const menus = await this.fetch(`/menus/public/${locale}`);
    return menus as Menu[];
  }
}

export const api = new Api();
