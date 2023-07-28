import Layout from '@/layout'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { AuthProvider } from '@/contexts/AuthContext'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pratique em Casa</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </Provider>
      <Analytics />
    </>
  )
}
