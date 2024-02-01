import Layout from '@/layout'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import Head from 'next/head'

// Adicione os scripts do OneSignal no Head do seu aplicativo
const OneSignalScript = () => (
  <>
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
    <script>
      var OneSignal = window.OneSignal || [];
      OneSignal.push(function() {
        OneSignal.init({
          appId: 'fef4bca8-b29c-43b2-8587-4447f7dbc98b',
        });
      });
    </script>
  </>
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pratique em Casa</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Adicione o componente OneSignalScript ao Head */}
        <OneSignalScript />
      </Head>
      <Provider store={store}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </Provider>
    </>
  );
}
