import { Affix, Layout as AntLayout, Button, ConfigProvider, Space, Typography } from 'antd'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'
import theme from '@/configs/theme'
import ptBR from 'antd/locale/pt_BR'
import LoginView from '@/pages/login'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'

const { Content } = AntLayout
const { Title } = Typography

export default function Layout({ children }) {
  const router = useRouter()
  const { themeMode } = useSelector(state => state.global)
  const { authenticated, usuario } = useSelector(state => state.login)
  const pathname = usePathname()
  return (
    <ConfigProvider theme={theme[themeMode] || theme.red} locale={ptBR}>
      {authenticated ? (
        <AntLayout className="app">
          <Header />
          <Content>
            <div className="d-flex justify-space-between">
              <Title level={3}>
                {pathname === '/'
                  ? 'Olá, ' + usuario.user_nicename.split('@')[0]
                  : utils.getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname)).title}
              </Title>
              {pathname !== '/' && (
                <Button onClick={() => router.back()} size="small" type="text" icon={<FaArrowLeft />}>
                  Voltar
                </Button>
              )}
            </div>
            {children}
          </Content>
          <Affix offsetBottom={12}>
            <Navigation data={routes} />
          </Affix>
        </AntLayout>
      ) : (
        <LoginView />
      )}
    </ConfigProvider>
  )
}
