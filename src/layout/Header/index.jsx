import { Button, Col, Dropdown, Layout, Row, theme } from 'antd'
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import Logo from '../Logo'
import { useRouter } from 'next/router'

const { Header: AntHeader } = Layout

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
      <Row justify="flex-end">
        <Col flex="auto">
          <div className="header-logo">
            <Logo type="min" />
          </div>
        </Col>
        <Col flex="auto" className="text-right">
          <Dropdown menu={{ items, onClick }} placement="bottomRight" overlayStyle={{ marginRight: 4, width: 150 }}>
            <Button className="header-button" type="text" icon={<FaUserCircle />} />
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  )
}
