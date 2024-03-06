import {apiPratiquePro} from '@/services';

export default async function handler(req, res) {

  let data = {
    meus_treinos: []
  }

  data.meus_treinos = await apiPratiquePro.ficha_avulsa.findMany({
    where: {
      id_ficha: parseInt(req.body.id)
    },
  });
  res.status(200).json(data)
}
