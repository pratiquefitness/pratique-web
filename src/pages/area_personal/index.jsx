import { Modal, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Carrossel from './_Carrossel'
import { useDispatch, useSelector } from 'react-redux'
import { bannerPersonal } from '@/redux/actions/areaDoPersonal'

const { Title, Text } = Typography

export default function AreaPersonal() {
  const dispatch = useDispatch();
  const [exercicioModal, setExercicioModal] = useState(false)
  const [imageModal, setImageModal] = useState('');
  const {banner} = useSelector(state => state.areaDoPersonal);
  const [listaCarouselPersonnal, setListaCarouselPersonnal] = useState([]);

  const closeExercicioModal = () => {
    setImageModal('')
    setExercicioModal(false)
  }

  useEffect(() => {
    dispatch(bannerPersonal());
  }, [])

  useEffect(() => {
    if(listaCarouselPersonnal.length > 0)return;
    if (banner.length !== 0) {
      banner.map((ban) => {
        const data = {
          image: ban.avatar_image,
          isRounded: true,
          alt: ban.user_email,
          setImageModal: setImageModal,
          setExercicioModal: setExercicioModal,
          href: "contato_personal",
          curriculo: ban.curriculo,
          telefone: ban.telefone,
          id: ban.ID
        }
        setListaCarouselPersonnal([...listaCarouselPersonnal, data]);
      });
    }
  }, [banner])

  return (
    <Space direction="vertical" className="w-100 mb-6">
      <div className="mt-4 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Contrate um Personal
        </Title>
      </div>
      <Carrossel listaCarousel={listaCarouselPersonnal} />
    </Space>
  )
}
