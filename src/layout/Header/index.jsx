import { Button, Col, Dropdown, Layout, Row, Space, Typography, theme } from 'antd'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import Logo from '../Logo'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const { Header: AntHeader } = Layout

const { Title } = Typography

const items = [
  {
    key: 'conta',
    icon: <FaUserCircle />,
    label: 'Minha Conta'
  },
  {
    key: 'sair',
    icon: <FaSignOutAlt />,
    label: 'Sair'
  }
]

export default function Header() {
  const router = useRouter()
  const { signOut } = useContext(AuthContext)
  const { usuario } = useSelector(state => state.login)
  const { token } = theme.useToken()

  const onClick = ({ key }) => {
    if (key === 'sair') {
      signOut()
    }
    if (key === 'conta') {
      router.push('/conta')
    }
  }

  return (
    <AntHeader style={{ background: token.colorPrimary }}>
      <div className="container">
        <Row justify="flex-end">
          <Col flex="auto">
            <div className="header-logo">
              <Link href="/">
                <Logo type="min" />
              </Link>
            </div>
          </Col>
          <Col flex="auto" className="text-right">
            <Dropdown menu={{ items, onClick }} placement="bottomRight" overlayStyle={{ marginRight: 4, width: 150 }}>
              <Button className="header-button" type="text" style={{ color: token.colorBgBase }}>
                <Space align="center">
                  {usuario.user_nicename.split('@')[0]}
                  <FaUserCircle size={24} style={{ marginBottom: -4 }} />
                </Space>
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
    </AntHeader>
  )
}
