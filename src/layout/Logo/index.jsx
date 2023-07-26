import { getTheme } from '@/configs/theme'
import { useSelector } from 'react-redux'

export default function Logo({ type = 'normal' }) {
  const { themeColor } = useSelector(state => state.global)
  return type === 'normal' ? (
    <img src="/logo.svg" height={58} />
  ) : (
    <img src={getTheme(themeColor || 'red').logo} height={31} />
  )
}
