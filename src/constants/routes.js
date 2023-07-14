import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'
import { HiUserGroup } from 'react-icons/hi'

const routes = [
  {
    title: 'Início',
    icon: <LuHome />,
    href: '/',
    showInNavigation: true
  },
  {
    title: 'Treino',
    icon: <LuDumbbell />,
    href: '/treino',
    showInNavigation: true
  },
  {
    title: 'Bike',
    icon: <LuBike />,
    href: '/bike',
    showInNavigation: true
  },
  {
    title: 'Afiliados',
    icon: <HiUserGroup />,
    href: '/afiliados',
    showInNavigation: true
  },
  {
    title: 'Conta',
    icon: <LuUser />,
    href: '/conta',
    showInNavigation: true
  },
  {
    title: 'Meditacao',
    href: '/meditacao',
    showInNavigation: false
  },
  {
    title: 'Aulas Coletivas',
    href: '/aulas_coletivas',
    showInNavigation: false
  },
  {
    title: 'Canal da Equipe',
    href: '/canal_equipe',
    showInNavigation: false
  },
  {
    title: 'Jump',
    href: '/jump',
    showInNavigation: false
  }
]

export default routes
