import '../styles/globals.scss'
import '../styles/ChatMessage.scss';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { NewMessageContextProvider } from '../src/contexts/NewMessageContext'; 

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <SessionProvider session={session}>
        <NewMessageContextProvider>
          <Component {...pageProps} />
        </NewMessageContextProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
