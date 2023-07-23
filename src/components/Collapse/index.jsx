import { CollapseStyled, PanelStyled } from './styles'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function Collapse({ children, ...props }) {
  const expandIcon = ({ isActive }) => (isActive ? <FaMinus /> : <FaPlus />)

  return (
    <CollapseStyled expandIcon={expandIcon} {...props}>
      {children}
    </CollapseStyled>
  )
}
