import prisma from '@/services/prisma'

export default async function handler(req, res) {
  const data = await prisma.aulas.findMany()
  //const json = JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
  //res.status(200).json(JSON.parse(json))
  res.status(200).json(data)
}
