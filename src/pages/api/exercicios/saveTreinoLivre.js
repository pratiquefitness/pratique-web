import { apiPratiquePro } from '@/services';

export default async function handler(req, res) {
  const { id_user, nome_treino, data_criacao, exercicios, id_professor } = req.body;

  const user = {
    id_user: parseInt(id_user),
    nome_treino: nome_treino,
    data_criacao: data_criacao,
    exercicios: exercicios,
    id_professor: id_professor
  }

  await apiPratiquePro.ficha_avulsa.create({
    data: user
  })
  res.status(200).json({});

}
