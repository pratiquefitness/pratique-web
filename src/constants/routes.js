import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'
import { HiUserGroup } from 'react-icons/hi'

const routes = [
  {
    title: 'Início',
    href: '/',
    icon: <LuHome />,
    showInNavigation: true
  },
  {
    title: 'Treino',
    href: '/treino',
    icon: <LuDumbbell />,
    showInNavigation: true
  },
  {
    title: 'Power Cycle',
    href: '/bike',
    icon: <LuBike />,
    showInNavigation: true
  },
  {
    title: 'Afiliados',
    href: '/afiliados',
    icon: <HiUserGroup />,
    showInNavigation: true
  },
  {
    title: 'Minha Conta',
    href: '/conta',
    icon: <LuUser />,
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
