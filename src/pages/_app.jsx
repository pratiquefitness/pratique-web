import Layout from '@/layout'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import Head from 'next/head'
import OneSignal from 'onesignal'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    OneSignal.initialize('fef4bca8-b29c-43b2-8587-4447f7dbc98b', 'OTU2MTNjNWEtYjJmZi00M2JlLTk3YmItNjc0NjRjYWRiNzAy')

    OneSignal.push(() => {
      // O usuário deu permissão
    })

    OneSignal.onmessage(notification => {
      // Tratar a notificação
    })
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
