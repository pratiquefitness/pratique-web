import { Button, Col, Layout, Row, theme } from 'antd'
import { FaUserCircle } from 'react-icons/fa'
import Logo from '../Logo'

const { Header: AntHeader } = Layout

export default function Header() {
  const { token } = theme.useToken()
  return (
    <AntHeader style={{ background: token.colorPrimary }}>
      <Row justify="flex-end">
        <Col flex="auto">
          <div className="header-logo">
            <Logo type="min" />
          </div>
        </Col>
        <Col flex="auto" className="text-right">
          <Button className="header-button" type="text" icon={<FaUserCircle />} />
        </Col>
      </Row>
    </AntHeader>
  )
}
