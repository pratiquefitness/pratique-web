import { useRouter } from 'next/router'
import Diagnose from './_Diagnose'

export default function Ver() {
  const router = useRouter()
  const { id } = router.query

  return <Diagnose id={parseInt(id)} />
}
