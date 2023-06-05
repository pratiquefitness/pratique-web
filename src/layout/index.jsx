'use client'
import { Layout as AntLayout, ConfigProvider, Typography } from 'antd'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import theme from '@/configs/theme'
import Login from '@/views/login'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'

const { Footer, Content } = AntLayout
const { Title } = Typography

const isLogged = true

export default function Layout({ children }) {
  const pathname = usePathname()
  return (
    <ConfigProvider theme={theme}>
      {isLogged ? (
        <AntLayout className="app">
          <Header />
          <Content>
            <Title level={3}>
              {utils.getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname)).title}
            </Title>
            {children}
          </Content>
          <Footer>
            <Navigation data={routes} />
          </Footer>
        </AntLayout>
      ) : (
        <Login />
      )}
    </ConfigProvider>
  )
}
