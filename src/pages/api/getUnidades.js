// src/pages/api/getUnidades.js

import { apiPratiquePro } from '@/services'

// Mapeamento de estados para inteiros ou strings, conforme a tipagem no banco
const estadoMapping = {
  MINAS_GERAIS: 1,
  SANTA_CATARINA: 2,
  PARANA: 3,
  ESPIRITO_SANTO: 4
}

export default async function handler(req, res) {
  console.log('Recebendo requisição em /api/getUnidades')
  console.log('Método HTTP:', req.method)
  console.log('Query Parameters:', req.query)
  console.log('apiPratiquePro:', apiPratiquePro)

  try {
    if (req.method !== 'GET') {
      console.warn(`Método ${req.method} não permitido.`)
      return res.status(405).json({ error: 'Método não permitido' })
    }

    const { search, estado } = req.query

    console.log(`Parâmetros recebidos - Search: "${search}", Estado: "${estado}"`)

    // Construir a condição de filtragem
    const where = {
      unidade_aparecer: true
    }

    if (estado) {
      const estadoUpper = estado.toUpperCase()
      const estadoInt = estadoMapping[estadoUpper]
      if (!estadoInt) {
        console.warn('Estado inválido fornecido:', estado)
        return res.status(400).json({ error: 'Estado inválido.' })
      }
      where.unidade_estado = estadoInt
      console.log(`Filtrando por estado: ${estadoInt}`)
    }

    if (search) {
      where.unidade_nome = {
        contains: search // Removido mode: 'insensitive'
      }
      console.log(`Filtrando por search: ${search}`)
    }

    console.log('Condições de filtragem:', where)

    const unidades = await apiPratiquePro.unidade.findMany({
      where,
      orderBy: {
        unidade_nome: 'asc' // Ordenar alfabeticamente
      },
      select: {
        unidade_id: true,
        unidade_nome: true,
        unidade_estado: true,
        unidade_pacto: true,
        unidade_numero: true,
        unidade_endereco: true,
        unidade_separador: true,
        unidade_slug: true,
        unidade_latitude: true,
        unidade_longitude: true
        // Remova 'unidade_pagolivre' se não existir no modelo
      }
    })

    console.log(`Unidades encontradas: ${unidades.length}`)

    res.status(200).json({ unidades })
  } catch (error) {
    console.error('Erro ao buscar unidades:', error)
    // Se disponível, logar mais detalhes
    if (error.message) {
      console.error('Mensagem do erro:', error.message)
    }
    // Retornar mensagem de erro detalhada em ambiente de desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      return res.status(500).json({ error: error.message })
    }
    res.status(500).json({ error: 'Erro ao buscar unidades.' })
  }
}
