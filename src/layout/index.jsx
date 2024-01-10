import { Affix, Layout as AntLayout, Button, ConfigProvider, Space, Typography, Breadcrumb } from 'antd'
import { HomeOutlined, DoubleRightOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Header from './Header'
import routes from '@/constants/routes'
import utils from '@/utils'
import { getTheme } from '@/configs/theme'
import ptBR from 'antd/locale/pt_BR'
import LoginView from '@/pages/login'
import { useRouter } from 'next/router'
import Browser from '@/components/Browser'
import { setBrowserURL } from '@/redux/slices/global'

const { Content } = AntLayout
const { Title } = Typography

export default function Layout({ children }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { themeColor, themeMode, browserURL } = useSelector(state => state.global)
  const { authenticated, usuario } = useSelector(state => state.login)
  const pathname = usePathname()

  const isApp = typeof window !== 'undefined' && window.self === window.parent ? true : false
  var fraseInicial = ''
  
  authenticated &&
    (fraseInicial = utils
      .getByObjectKeyValue(routes, 'href', utils.getFirstLevelRoute(pathname))
      .title.replace('#USUARIO#!', `${usuario.user_nicename.split('@')[0]}!`)
      .split('!')
	)

console.log("all data",children)

  return (
    <ConfigProvider theme={getTheme(themeColor, themeMode)} locale={ptBR}>
      {authenticated ? (
		  <>
		  <AntLayout className="app">
            <Browser url={browserURL} onClose={() => dispatch(setBrowserURL(null))} />
            <Header />
            <Content
              style={{
                paddingTop: '1rem',
                paddingBottom: '60px'
              }}
            >
              <div className="container">
                <div className="d-flex flex-column justify-space-between">
                  {pathname !== '/' && (
                    <Breadcrumb
                      separator={<DoubleRightOutlined className="text-gray" />}
                      className="mb-4 ml-2 text-capitalize d-flex items-center"
                      items={[
                        {
                          title: <HomeOutlined />,
                          onClick: () => router.back()
                        },
                        {
                          style: 'line-height: 1.7;',
                          title: `${pathname.substring(1)}`
                        }
                      ]}
                    />
                  )}
                  <Title level={3}>
                    {fraseInicial[0]} <br /> {fraseInicial[1]}
                  </Title>
                </div>
                {children}
              </div>
            </Content>
            <Navigation data={routes} />
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
