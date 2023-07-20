import Layout from '@/layout'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
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
