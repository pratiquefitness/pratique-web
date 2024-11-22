import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { chave } = req.body

  if (!chave) {
    return res.status(400).json({ error: 'Chave Pix é obrigatória.' })
  }

  try {
    const pagamentos = await prisma.transacao_pix.findMany({
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

    res.status(200).json(pagamentos)
  } catch (error) {
    console.error('Erro ao buscar pagamentos do Pix:', error)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}
