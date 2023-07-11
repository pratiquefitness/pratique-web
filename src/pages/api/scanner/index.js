import { apiPratiqueDiagnose } from '@/services'

export default async function handler(req, res) {
  const email = 'adelmodesign@gmail.com'
  const data = await apiPratiqueDiagnose.windows.findMany({
    where: {
      diagnose_email: email
    },
    orderBy: {
      diagnose_data: 'desc'
    }
  })
  res.status(200).json(data)
}
