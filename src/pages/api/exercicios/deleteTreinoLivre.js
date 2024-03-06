import { apiPratiquePro } from '@/services';

export default async function handler(req, res) {
  const { id } = req.body;
  await apiPratiquePro.ficha_avulsa.delete({
    where: {
      id_ficha: id,
    },
  });
  res.status(200).json({});
}
