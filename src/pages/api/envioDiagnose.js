import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'

export default async function apiPratiqueTec(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método não permitido' })
    return
  }

  try {
    const respostaArray = JSON.parse(Object.keys(req.body)[0])
    const stringResposta = JSON.stringify(respostaArray)

    const apiUrl = '/app/diagnose/envia/processa/respostas.php'
    //const urlWithParams = `${apiUrl}?resposta=${stringResposta}`

	//console.log("url final",urlWithParams)
    const response = await apiPratiqueTecnologia.post(
      apiUrl,
      { resposta: stringResposta },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    res.status(200).json(response.data)
  } catch (error) {
    console.log('error', error)
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' })
  }
}
