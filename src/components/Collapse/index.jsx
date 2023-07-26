import { theme } from 'antd'
import { CollapseStyled, PanelStyled } from './styles'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function Collapse({ children, ...props }) {
  const { token } = theme.useToken()
  const expandIcon = ({ isActive }) => (isActive ? <FaMinus /> : <FaPlus />)

  return (
    <CollapseStyled expandIcon={expandIcon} {...props} style={{ background: token.colorPrimary }}>
      {children}
    </CollapseStyled>
  )
}
