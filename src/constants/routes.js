import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'
//import { GoHome } from 'react-icons/go'
import {
  IoHomeOutline,
  IoHomeSharp,
  IoPerson,
  IoPersonOutline,
  IoPeopleCircleOutline,
  IoPeopleCircle,
  IoBicycleOutline,
  IoBicycle
} from 'react-icons/io5'
import { HiUserGroup } from 'react-icons/hi'

const routes = [
  {
    title: 'Olá #USUARIO#!',
    href: '/',
    icon: <IoHomeOutline />,
    activeIcon: <IoHomeSharp />,
    showInNavigation: true
  },
  {
    title: 'Olá #USUARIO#! Tenha um bom treino.',
    href: '/treino',
    icon: <LuDumbbell />,
    activeIcon: <LuDumbbell />,
    showInNavigation: true
  },
  {
    title: 'Power Cycle',
    href: '/bike',
    icon: <IoBicycleOutline />,
    activeIcon: <IoBicycle />,
    showInNavigation: true
  },
  {
    title: 'Afiliados',
    href: '/afiliados',
    icon: <IoPeopleCircleOutline />,
    activeIcon: <IoPeopleCircle />,
    showInNavigation: true
  },
  {
    title: 'Minha Conta',
    href: '/conta',
    icon: <IoPersonOutline />,
    activeIcon: <IoPerson />,
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
    title: 'Unipower',
    href: '/unipower',
    showInNavigation: false
  }
]

export default routes
