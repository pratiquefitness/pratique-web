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

  const onNavigate = (href, title) => () => {
    setSelected(href)

    if (title === 'Blog') {
      dispatch(setBrowserURL('https://pratiquefitness.com.br/blog/'))
      //router.push('/blog')
      return
    }
    dispatch(setBrowserURL(null))
    router.push(href)
  }

  return (
    <div className="navigation" style={{ background: token.colorPrimary }}>
      <ul>
        {data.map(({ href, showInNavigation, activeIcon, icon, title }, key) => {
          const checkBike = href !== '/bike' || isHomeUser
          const checkAfiliate = href !== '/afiliados' || isAffiliate
          return (
            showInNavigation &&
            checkBike &&
            checkAfiliate && (
              <li className={href === selected ? 'list active' : 'list'} onClick={onNavigate(href, title)} key={key}>
                <a style={{ pointerEvents: 'none' }}>
                  <span className="icon text-white">{href === selected ? activeIcon : icon}</span>
                </a>
              </li>
            )
          )
        })}
      </ul>
    </div>
  )
}
