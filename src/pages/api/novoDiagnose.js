import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'

export default async function apiPratiqueTec(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Metodo não permitido' })
    return
  }
  
  try {
    const response = await apiPratiqueTecnologia.get('/app/diagnose/diagnose.php', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    res.status(200).json(response.data)
  } catch (error) {
    console.log('error', error)
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' })
  }
}
