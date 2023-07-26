import { Button, Col, Row } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { FaDiagnoses } from 'react-icons/fa'
import { LuDumbbell, LuUserCheck } from 'react-icons/lu'

const navigation = [
  {
    title: 'Meu Treino',
    href: '/treino',
    icon: <LuDumbbell />
  },
  {
    title: 'Scanner',
    href: '/treino/scanner',
    icon: <LuUserCheck />
  },
  {
    title: 'Diagnose',
    href: '/treino/diagnose',
    icon: <FaDiagnoses />
  }
]

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Row gutter={8}>
      {navigation.map((item, key) => (
        <Col flex="auto" key={key}>
          <Button
            type={item.href === pathname ? 'primary' : 'default'}
            onClick={() => router.push(item.href)}
            style={{ height: 'auto', display: 'block' }}
            block
          >
            <div>{item.icon}</div>
            <div>{item.title}</div>
          </Button>
        </Col>
      ))}
    </Row>
  )
}
