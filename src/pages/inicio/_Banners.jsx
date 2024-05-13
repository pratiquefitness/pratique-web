import Loading from '@/components/Loading'
import { getLives } from '@/redux/actions/lives'
import { theme } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link'
import CarouselItem from './_CarouselItem'

/*
5 min - em instantes
agora - acontecendo
*/

const listaCarousel = [
  {
    href: '/aulas_coletivas/powerdance',
    image: '/images/banner_home/power-dance-horizontal.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/powercore',
    image: '/images/banner_home/power-core-horizontal.png',
    isRounded: true
  },
  {
    href: '/bike',
    image: '/images/banner_home/power_cycle.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/abdominais',
    image: '/images/banner_home/abdominais.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/queime_em_casa',
    image: '/images/banner_home/queime_casa.png',
    isRounded: true
  }
]

export default function Banners() {
  const dispatch = useDispatch()
  const { token } = theme.useToken()
  const { data, loading } = useSelector(state => state.lives)

  useEffect(() => {
    dispatch(getLives())
  }, [])

  return (
    <Loading spinning={loading}>
      {data.length ? (
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={true}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {listaCarousel.map(({ href, image, isRounded }, index) => (
            <CarouselItem key={index} href={href} image={image} isRounded={isRounded} />
          ))}
        </Carousel>
      ) : null}
    </Loading>
  )
}
