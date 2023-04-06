import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { cn } from '@langchain-js-demo/utils';

import '../styles/index.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to site!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={cn(inter.variable, 'flex flex-col justify-center')}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
