// src/pages/api/getUnidades.js

import { PrismaClient, Estado } from '@prisma/client'

// Implementação de Singleton Manual
let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { search, estado } = req.query

  // Construir a condição de filtragem
  const where = {
    unidade_aparecer: true
  }

  if (estado && Object.values(Estado).includes(estado)) {
    where.unidade_estado = estado
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
  }
}
