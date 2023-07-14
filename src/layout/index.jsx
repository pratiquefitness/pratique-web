import { Affix, Layout as AntLayout, ConfigProvider, Typography } from 'antd'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Login from '@/views/login'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'
import theme from '@/configs/theme'
import ptBR from 'antd/locale/pt_BR'

const { Content } = AntLayout
const { Title } = Typography

export default function Layout({ children }) {
  const { themeMode } = useSelector(state => state.global)
  const { authenticated } = useSelector(state => state.login)
  const pathname = usePathname()
  return (
    <ConfigProvider theme={theme[themeMode] || theme.red} locale={ptBR}>
      {authenticated ? (
        <AntLayout className="app">
          <Header />
          <Content>
            <Title level={3}>
              {utils.getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname)).title}
            </Title>
            {children}
          </Content>
          <Affix offsetBottom={12}>
            <Navigation data={routes} />
          </Affix>
        </AntLayout>
      ) : (
        <Login />
      )}
    </ConfigProvider>
  )
}
