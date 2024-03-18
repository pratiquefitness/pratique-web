import { Badge } from 'antd'

const { Ribbon } = Badge

export default function RibbonWithEndDate({ children, endDate, ...props }) {
  const isVisible = new Date() < endDate
  return isVisible ? <Ribbon {...props}>{children}</Ribbon> : children
}
