import { Layout, theme } from 'antd'
import Logo from '../Logo'

const { Header: AntHeader } = Layout

export default function Header() {
  const { token } = theme.useToken()
  return (
    <AntHeader style={{ background: token.colorPrimary }}>
      <div className="header-logo">
        <Logo type="min" />
      </div>
    </AntHeader>
  )
}
