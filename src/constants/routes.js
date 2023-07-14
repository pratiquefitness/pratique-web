import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'

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
    title: 'Instruções',
    icon: <LuHelpCircle />,
    href: '/instrucoes',
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
