'use client'

import Script from 'next/script'

type CaptchaAction = 'bullies' | 'parents';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: VoidFunction) => void;
      execute: (pkey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function CaptchaScript() {
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY}`}
      strategy="lazyOnload"
    />
  )
}

export function getCaptchaToken(action: CaptchaAction) {
  return new Promise<string>((resolve, reject) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action }).then(resolve).catch(reject)
    })
  })
}