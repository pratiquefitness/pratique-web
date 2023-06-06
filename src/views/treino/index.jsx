import { Layout } from 'antd'
import Navigation from './components/Navigation'

const { Content } = Layout

export default function TreinoView({ children }) {
  return (
    <div>
      <Navigation />
      <Content style={{ padding: '12px 0px' }}>{children}</Content>
    </div>
  )
}
