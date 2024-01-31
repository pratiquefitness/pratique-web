import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from '@/contexts/AuthContext'
import Head from 'next/head'
import Layout from '@/layout'
import store from '@/redux/store'
import OneSignal from 'react-onesignal' // Importe o react-onesignal

export default function App({ Component, pageProps }) {
  // Inicialize o OneSignal no início do aplicativo
  useEffect(() => {
    OneSignal.initialize('fef4bca8-b29c-43b2-8587-4447f7dbc98b')
    OneSignal.showNativePrompt()
  }, [])

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
    </>
  )
}
