import { LuDumbbell } from 'react-icons/lu'
import {
  IoHomeOutline,
  IoHomeSharp,
  IoPerson,
  IoPersonOutline,
  IoPeopleCircleOutline,
  IoPeopleCircle,
  IoBicycleOutline,
  IoBicycle,
  IoNewspaper,
  IoNewspaperOutline,
  IoCalendarOutline,
  IoCalendar
} from 'react-icons/io5'

const routes = [
  {
    title: 'Olá, #USUARIO#!',
    href: '/',
    icon: <IoHomeOutline />,
    activeIcon: <IoHomeSharp />,
    showInNavigation: true
  },
  {
    title: 'Olá, #USUARIO#! Tenha um bom treino.',
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
    showInNavigation: false
  },
  {
    title: 'Minha Conta',
    href: '/conta',
    icon: <IoPersonOutline />,
    activeIcon: <IoPerson />,
    showInNavigation: true
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: <IoNewspaperOutline />,
    activeIcon: <IoNewspaper />,
    showInNavigation: true
  },
  {
    title: 'Calendário',
    href: '/calendario',
    icon: <IoCalendarOutline />,
    activeIcon: <IoCalendar />,
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
