// /pages/api/afiliados/getPixPayments.js

import { PrismaClient } from '@prisma/client'
import utils from '@/utils'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  console.log('Dados recebidos no backend:', req.body) // Log para depuração

  const { chave } = req.body

  if (!chave) {
    console.log('Chave Pix não foi fornecida.') // Log adicional
    return res.status(400).json({ error: 'Chave Pix é obrigatória.' })
  }

  console.log('Chave Pix recebida:', chave) // Log adicional

  try {
    // Buscar os pagamentos usando a chave Pix
    const pagamentos = await prisma.transacaoPix.findMany({
      where: {
        chave: chave
      },
      select: {
        id: true,
        data_hora_movimento: true,
        valor: true,
        conta_corrente: true
      },
      orderBy: {
        data_hora_movimento: 'desc'
      }
    })

    console.log('Pagamentos encontrados:', pagamentos) // Log adicional

    res.status(200).json({ pixPayments: utils.clearDatabaseResult(pagamentos) })
  } catch (error) {
    console.error('Erro ao buscar pagamentos do Pix:', error)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  } finally {
    await prisma.$disconnect()
  }
}
