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
import PratiqueIcon from '@/components/PratiqueIcon/PratiqueIcon'

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
    title: '',
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
    title: '',
    href: '/powerflix',
    icon: <PratiqueIcon />,
    activeIcon: <PratiqueIcon />,
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
    showInNavigation: false
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
    title: 'powerbumbum',
    href: '/powerbumbum',
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
  },
  {
    //title: 'Olá, #USUARIO#! Tenha um bom treino.',
    title: '',
    href: '/exercicios',
    showInNavigation: false
  },
  {
    title: 'Meus Treinos',
    href: '/meus_treinos',
    showInNavigation: false
  },
  {
    title: 'Power Core',
    href: '/powercore',
    showInNavigation: false
  },
  {
    title: 'Editar Treino Livre',
    href: '/editar_meus_treinos',
    showInNavigation: false
  },
  {
    title: "Área do Personal. Olá, #USUARIO#!",
    href: '/personal',
    showInNavigation: false
  },
  {
    title: "Contrate um Personal",
    href: '/contato_personal',
    showInNavigation: false
  },
  {
    title: "",
    href: '/treino_alunos_personal',
    showInNavigation: false
  }
]

export default routes
