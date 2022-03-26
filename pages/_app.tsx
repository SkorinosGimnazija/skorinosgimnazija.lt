import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>P. Skorinos Gimnazija</title>
        <meta name="description" content="Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
