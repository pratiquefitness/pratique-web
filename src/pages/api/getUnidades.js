import { apiPratiquePro } from '@/services'

export default async function handler(req, res) {
  try {
    // Consulta ao banco de dados para obter as unidades
    const unidades = await apiPratiquePro.unidade.findMany({
      select: {
        unidade_id: true,
        unidade_nome: true,
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

    // Retorna as unidades em formato JSON
    res.status(200).json({ unidades })
  } catch (error) {
    console.error('Erro ao buscar unidades:', error)
    res.status(500).json({ error: 'Erro ao buscar unidades.' })
  }
}
