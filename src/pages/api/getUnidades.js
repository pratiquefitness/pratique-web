// pages/api/getUnidades.js

import { PrismaClient, Estado } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { search, estado } = req.query

  // Mapear estados para os valores numéricos
  const estadoMap = {
    1: 'MINAS_GERAIS',
    2: 'SANTA_CATARINA',
    3: 'PARANA',
    4: 'ESPIRITO_SANTO'
  }

  // Construir a condição de filtragem
  const where = {
    unidade_aparecer: true
  }

  if (estado && estadoMap[estado]) {
    where.unidade_estado = estadoMap[estado]
  }

  if (search) {
    where.unidade_nome = {
      contains: search,
      mode: 'insensitive'
    }
  }

  try {
    const unidades = await prisma.unidade.findMany({
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
  } finally {
    await prisma.$disconnect()
  }
}
