import { LuHome, LuDumbbell, LuBike, LuHelpCircle, LuUser } from 'react-icons/lu'

const routes = [
  {
    title: 'Início',
    icon: <LuHome />,
    href: '/'
  },
  {
    title: 'Treino',
    icon: <LuDumbbell />,
    href: '/treino'
  },
  {
    title: 'Bike',
    icon: <LuBike />,
    href: '/bike'
  },
  {
    title: 'Instruções',
    icon: <LuHelpCircle />,
    href: '/instrucoes'
  },
  {
    title: 'Conta',
    icon: <LuUser />,
    href: '/conta'
  }
]

export default routes
