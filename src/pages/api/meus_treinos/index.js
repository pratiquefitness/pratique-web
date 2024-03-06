import {apiPratiquePro} from '@/services';

export default async function handler(req, res) {

  let data = {
    meus_treinos: []
  }

  /* fazer um merge aqui */

  data.meus_treinos = await apiPratiquePro.ficha_avulsa.findMany({
    where: {
      id_ficha: parseInt(req.body.id)
    },
  });

  if (data.meus_treinos.length) {
    //const treinos = data.meus_treinos.videos.split(',')
    const treinos = [1, 2, 3 ,5 ,6];

    data.exercises = await apiPratiquePro.exercicio.findMany({
      where: {
          exercicio_id: {in: treinos}
      },
    });
  }

  res.status(200).json(data)
}
