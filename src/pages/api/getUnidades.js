// src/pages/api/getUnidades.js

import { apiPratiquePro } from '@/services'

// Mapeamento de estados para inteiros
const estadoMapping = {
  MINAS_GERAIS: 1,
  SANTA_CATARINA: 2,
  PARANA: 3,
  ESPIRITO_SANTO: 4
}

export default async function handler(req, res) {
  console.log('Método HTTP:', req.method)
  console.log('Query Parameters:', req.query)
  console.log('apiPratiquePro:', apiPratiquePro)

  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Método não permitido' })
    }

    const { search, estado } = req.query

    // Construir a condição de filtragem
    const where = {
      unidade_aparecer: true
    }

    if (estado) {
      const estadoUpper = estado.toUpperCase()
      const estadoInt = estadoMapping[estadoUpper]
      if (!estadoInt) {
        return res.status(400).json({ error: 'Estado inválido.' })
      }
      where.unidade_estado = estadoInt
    }

    if (search) {
      where.unidade_nome = {
        contains: search,
        mode: 'insensitive'
      }
    }

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
        unidade_pagolivre: true,
        unidade_latitude: true,
        unidade_longitude: true
      }
    })

    res.status(200).json({ unidades })
  } catch (error) {
    console.error('Erro ao buscar unidades:', error)
    res.status(500).json({ error: 'Erro ao buscar unidades.' })
  }
}
