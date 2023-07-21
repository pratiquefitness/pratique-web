import { useRouter } from 'next/router'
import AulasColetivas from './_AulasColetivas'

export default function Tema() {
  const router = useRouter()
  const { tema } = router.query

  return <AulasColetivas tema={tema} />
}
