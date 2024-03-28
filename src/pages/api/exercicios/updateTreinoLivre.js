import { apiPratiquePro } from '@/services';

export default async function handler(req, res) {
  const { id_user, id_ficha, nome_treino, exercicios } = req.body.data;
  await apiPratiquePro.ficha_avulsa.update({
    where: {
      id_ficha: id_ficha,
    },
    data: {
      id_user: parseInt(id_user),
      id_ficha: id_ficha,
      nome_treino: nome_treino,
      exercicios: exercicios
    }
  });
  res.status(200).json({});
}
