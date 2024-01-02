import { Affix, Layout as AntLayout, Button, ConfigProvider, Space, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'
import theme, { getTheme } from '@/configs/theme'
import ptBR from 'antd/locale/pt_BR'
import LoginView from '@/pages/login'
import { FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Browser from '@/components/Browser'
import { setBrowserURL } from '@/redux/slices/global'
import { Footer } from 'antd/es/layout/layout'

const { Content } = AntLayout
const { Title } = Typography

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { themeColor, themeMode, browserURL } = useSelector(state => state.global)
  const { authenticated, usuario } = useSelector(state => state.login)
  const pathname = usePathname()

  const isApp = typeof window !== 'undefined' && window.self === window.parent ? true : false

  return (
    <ConfigProvider theme={getTheme(themeColor, themeMode)} locale={ptBR}>
      {authenticated ? (
        <>
          <AntLayout className="app">
            <Browser url={browserURL} onClose={() => dispatch(setBrowserURL(null))} />
            <Header />
            <Content
              style={{
                
                paddingBottom:"50px"
              }}
            >
              <div className="container">
                <div className="d-flex justify-space-between">
                  <Title level={3}>
                    {utils
                      .getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname))
                      .title.replace('#USUARIO#', usuario.user_nicename.split('@')[0])}
                  </Title>
                  {pathname !== '/' && (
                    <Button onClick={() => router.back()} size="small" type="text" icon={<FaArrowLeft />}>
                      Voltar
                    </Button>
                  )}
                </div>
                {children}
              </div>
            </Content>
            <Footer
            >
              <Navigation data={routes} />
            </Footer>
          </AntLayout>
        </>
      ) : pathname && pathname.includes('/afiliados/loja/') ? (
        children
      ) : (
        <LoginView />
      )}
    </ConfigProvider>
  )
}
