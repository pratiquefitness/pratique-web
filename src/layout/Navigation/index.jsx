import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import utils from '@/utils'
import { theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setBrowserURL } from '@/redux/slices/global'

export default function Navigation({ data }) {
  const dispatch = useDispatch()
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

    if (item.title === 'Blog') {
      router.push('/')
      dispatch(setBrowserURL('https://pratiquefitness.com.br/blog/'))
    } else {
      dispatch(setBrowserURL(null))
      router.push(item.href)
    }
  }

  return (
    <div className="navigation" style={{ background: token.colorPrimary }}>
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
                  <span className="icon" style={{ color: 'white' }}>
                    {item.href === selected ? item.activeIcon : item.icon}
                  </span>
                </a>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}
