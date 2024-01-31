import { Tabs } from 'antd'
import Produtos from '../_Produtos'
import PlanosAcademia from '../_PlanosAcademia'
import PratiqueMed from '../_PratiqueMed'
import { useRouter } from 'next/router'

export default function Afiliados() {
  const router = useRouter()
  const { employee } = router.query

  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="0"
        items={[
          {
            key: 'produtos',
            label: `Produtos`,
            children: <Produtos employee={employee} />
          },
          {
            key: 'planos',
            label: `Planos`,
            children: <PlanosAcademia employee={employee} />
          },
          {
            key: 'jumperfit',
            label: `Jumper Fit`,
            children: <JumperFit employee={employee} />
          },
          {
            key: 'pratiquemed',
            label: `Pratique Med`,
            children: <PratiqueMed employee={employee} />
          }
        ]}
      />
    </div>
  )
}
