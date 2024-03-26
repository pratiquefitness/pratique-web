const express = require('express')
const fetch = require('node-fetch')
const app = express()

// Endpoint para lidar com a solicitação de download do PDF
app.get('/download-pdf', async (req, res) => {
  const { examId } = req.query

  try {
    // Faz a solicitação ao servidor externo para obter o PDF
    const response = await fetch(`https://www.anovator.com/report/index.html?id=${examId}&child=false&lang=en_EN`)
    const pdfBlob = await response.blob()

    // Define os cabeçalhos da resposta
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf')
    res.setHeader('Content-Type', 'application/pdf')

    // Envia o blob do PDF como resposta
    pdfBlob.stream().pipe(res)
  } catch (error) {
    console.error('Erro ao baixar o relatório PDF:', error)
    res.status(500).send('Erro ao baixar o relatório PDF')
  }
})

// Inicia o servidor na porta 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`)
})
