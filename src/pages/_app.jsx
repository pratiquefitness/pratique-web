import Layout from '@/layout'
import theme from '@/configs/theme'
import store from '@/redux/store'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ConfigProvider>
  )
}
