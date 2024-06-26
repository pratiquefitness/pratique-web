import {apiPratiquePro} from '@/services';

export default async function handler(req, res) {

  let data = {
    meus_treinos: [],
    exercises: []
  }

  data.exercises = await apiPratiquePro.exercicio.findMany({
    where: {
      AND: [{
        exercicio_nome: {not: ''}
      }, {
        exercicio_nome: {not: '# PROCURE O PROFESSOR'}
      }],
    },
    orderBy: [
      {
        exercicio_nome: 'asc',
      },
    ],
  });

  data.meus_treinos = await apiPratiquePro.ficha_avulsa.findMany({
    where: {
      id_professor: parseInt(req.body.usuarioId)
    },
    orderBy: [
      {
        data_criacao: 'desc',
      },
    ],
  });

  res.status(200).json(data)
}
