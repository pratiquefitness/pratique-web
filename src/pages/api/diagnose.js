import { apiPratiqueDiagnose } from '@/services'

export default async function handler(req, res) {
  try {
    const { email } = req.body

    // Adicione uma verificação para garantir que apiPratiqueDiagnose.sva seja definido
    if (!apiPratiqueDiagnose || !apiPratiqueDiagnose.windows) {
      return res
        .status(500)
        .json({ error: 'Internal Server Error', details: 'apiPratiqueDiagnose.windows is undefined' })
    }

    const data = await apiPratiqueDiagnose.windows.findMany({
      where: {
        diagnose_email: email
      },
      orderBy: {
        diagnose_data: 'desc'
      }
    })

    // Converta o campo diagnose_data para string
    const formattedData = data.map(entry => ({
      ...entry,
      diagnose_data: entry.diagnose_data?.toString()
    }))

    res.status(200).json(formattedData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error', details: error.message })
  }
}
