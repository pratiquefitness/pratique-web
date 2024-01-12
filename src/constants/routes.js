import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'
import { HiUserGroup } from 'react-icons/hi'

const routes = [
  {
    title: 'Olá, #USUARIO#!',
    href: '/',
    icon: <LuHome />,
    showInNavigation: true
  },
  {
    title: 'Olá, #USUARIO#! Tenha um bom treino.',
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
    title: 'Meditação',
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
  },
  {
    title: 'abdominais',
    href: '/abdominais',
    showInNavigation: false
  },
  {
    title: 'intensivejump',
    href: '/intensivejump',
    showInNavigation: false
  },
  {
    title: 'powerdance',
    href: '/powerdance',
    showInNavigation: false
  },
  {
    title: 'treinosdiarios',
    href: '/treinosdiarios',
    showInNavigation: false
  },
  {
    title: 'abdominais',
    href: '/abdominais',
    showInNavigation: false
  },
  {
    title: 'fitdance',
    href: '/fitdance',
    showInNavigation: false
  },
  {
    title: 'flow',
    href: '/flow',
    showInNavigation: false
  },
  {
    title: 'queimeacasa',
    href: '/queimeacasa',
    showInNavigation: false
  },
  {
    title: 'Unipower',
    href: '/unipower',
    showInNavigation: false
  }
]

export default routes
