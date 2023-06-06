import { Layout as AntLayout, ConfigProvider, Typography } from 'antd'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Login from '@/views/login'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'

const { Footer, Content } = AntLayout
const { Title } = Typography

export default function Layout({ children }) {
  const { isAuthenticated } = useSelector(state => state.global)
  const pathname = usePathname()
  return !isAuthenticated ? (
    <AntLayout className="app">
      <Header />
      <Content>
        <Title level={3}>{utils.getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname)).title}</Title>
        {children}
      </Content>
      <Footer>
        <Navigation data={routes} />
      </Footer>
    </AntLayout>
  ) : (
    <Login />
  )
}
