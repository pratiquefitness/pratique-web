import theme from '@/configs/theme'
import store from '@/redux/store'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'

export default function App({ children }) {
  return (
    <ConfigProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ConfigProvider>
  )
}
