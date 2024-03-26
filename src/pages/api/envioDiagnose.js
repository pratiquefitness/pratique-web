import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'

export default async function apiPratiqueTec(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Método não permitido' })
    return
  }

  try {
    const respostaArray = JSON.parse(Object.keys(req.body)[0])
    const stringResposta = JSON.stringify(respostaArray)

    const apiUrl = '/app/diagnose/envia/processa/respostas-alunos.php'
    const urlWithParams = `${apiUrl}?resposta=${stringResposta}`

    console.log('url final', urlWithParams)
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
    const idDiagnose = response.data
    return idDiagnose
  } catch (error) {
    console.log('error', error)
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' })
  }
}

{
  /*
import axios from 'axios'
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
    const urlWithParams = `${apiUrl}?resposta=${stringResposta}`

    console.log('url final', urlWithParams)

    // Use axios to handle the request and follow redirects
    const response = await axios.post(
      apiUrl,
      { resposta: stringResposta },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        maxRedirects: 0, // Disable automatic redirects
        validateStatus: status => status >= 200 && status < 300 // Consider redirects as successful
      }
    )

    // Check if it's a redirect response
    if (response.status >= 300 && response.status < 400 && response.headers.location) {
      // If it's a redirect, you can access the redirected URL from response.headers.location
      const redirectedUrl = response.headers.location
      console.log('Redirected URL:', redirectedUrl)

      // You can now make another request to the redirected URL if needed
      const redirectedResponse = await axios.get(redirectedUrl)
      // Do something with the redirected response if needed
      console.log('Redirected Response:', redirectedResponse.data)
    }

    // Handle the original response as needed
    res.status(response.status).json(response.data)
  } catch (error) {
    console.log('error', error)
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' })
  }
}*/
}
