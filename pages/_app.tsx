// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

// gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fde047" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
