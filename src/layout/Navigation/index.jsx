import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import utils from '@/utils'
import { theme } from 'antd'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export default function Navigation({ data }) {
  const { token } = theme.useToken()
  const { usuario } = useSelector(state => state.login)
  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = useState(
    utils.getByObjectKeyValue(data, 'href', utils.getFirstLevelRoute(pathname)).href
  )

  const isHomeUser = usuario.plano?.includes('CASA') || false

  const isAffiliate = !!usuario.isAffiliate

  useEffect(() => {
    setSelected(utils.getFirstLevelRoute(pathname))
  }, [pathname])

  const onNavigate = item => () => {
    setSelected(item.href)
    router.push(item.href)
  }

  const getWidth = () => {
    const widthPerItem = 70
    let width = 210
    if (isHomeUser) width = width + widthPerItem
    if (isAffiliate) width = width + widthPerItem
    return width
  }

  return (
    <div className="navigation" style={{ background: token.colorPrimary, width: getWidth() }}>
      <ul>
        {data.map((item, key) => {
          const checkBike = item.href === '/bike' ? isHomeUser : true
          const checkAfiliate = item.href === '/afiliados' ? isAffiliate : true
          return (
            item.showInNavigation &&
            checkBike &&
            checkAfiliate && (
              <li className={item.href === selected ? 'list active' : 'list'} onClick={onNavigate(item)} key={key}>
                <a style={{ pointerEvents: 'none' }}>
                  <span className="icon" style={{ color: item.href === selected ? token.colorPrimary : 'white' }}>
                    {item.icon}
                  </span>
                </a>
              </li>
            )
          )
        })}
        <div className="indicator"></div>
      </ul>
    </div>
  )
}
