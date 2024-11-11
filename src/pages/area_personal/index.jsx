import { Modal, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Carrossel from './_Carrossel'
import { useDispatch, useSelector } from 'react-redux';
import {usePathname} from 'next/navigation';
import { bannerPersonal, bannerPersonalGeral } from '@/redux/actions/areaDoPersonal'

const { Title, Text } = Typography

export default function AreaPersonal() {
  const path = usePathname();
  const dispatch = useDispatch();
  const [exercicioModal, setExercicioModal] = useState(false)
  const [imageModal, setImageModal] = useState('');
  const {banner} = useSelector(state => state.areaDoPersonal);
  const [listaCarouselPersonnal, setListaCarouselPersonnal] = useState({
    data: []
  });

  const closeExercicioModal = () => {
    setImageModal('')
    setExercicioModal(false)
  }

  useEffect(() => {
    dispatch(bannerPersonalGeral());
  }, [])

  useEffect(() => {
    if(banner?.message !== undefined) return;
    if (banner === undefined) {
      setListaCarouselPersonnal(prevState => ({
        data: []
      }))
      return
    }

    if (banner.length !== 0) {
      setListaCarouselPersonnal(prevState => ({
        ...prevState,
        data: banner.map((ban) => {
        return {
          image: ban.avatar_image,
          isRounded: true,
          alt: ban.user_email,
          setImageModal: setImageModal,
          setExercicioModal: setExercicioModal,
          href: 'contato_personal',
          curriculo: ban.curriculo,
          telefone: ban.telefone,
          id: ban.ID,
          display_name: ban.display_name,
          instagram: ban.instagram,
          cidade: ban.cidade,
          estado: ban.estado,
          user_email: ban.user_email,
        }
        })
      }))
    }
  }, [banner, path]);

  return (
    <>
      {
        listaCarouselPersonnal.data.length > 0 &&
          <Space direction="vertical" className="w-100 mb-6">
            <div className="mt-4 flex flex-column mb-0">
              <Title level={3} className="mb-0">
                Contrate um Personal
              </Title>
            </div>
            <Carrossel listaCarousel={listaCarouselPersonnal.data.sort( () => Math.random() - 0.5)} />
          </Space>
      }
    </>
  )
}
