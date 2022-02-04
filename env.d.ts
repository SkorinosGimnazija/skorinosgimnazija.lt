export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CAPTCHA_KEY: string;
      NEXT_PUBLIC_STATIC_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
