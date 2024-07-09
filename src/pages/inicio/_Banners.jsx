import Loading from '@/components/Loading'
import { getLives } from '@/redux/actions/lives'
import { theme } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItem from './_CarouselItem'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { InView } from "react-intersection-observer";

/*
5 min - em instantes
agora - acontecendo
*/

const listaCarousel = [
  {
    href: '/aulas_coletivas/powerdance',
    image: '/images/webp/banner_home/power-dance-horizontal.webp',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/powercore',
    image: '/images/webp/banner_home/power-core-horizontal.webp',
    isRounded: true
  },
  {
    href: '/bike',
    image: '/images/webp/banner_home/power_cycle.webp',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/abdominais',
    image: '/images/webp/banner_home/abdominais.webp',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/queime_em_casa',
    image: '/images/webp/banner_home/queime_casa.webp',
    isRounded: true
  }
]

export default function Banners() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLives())
  }, [])

  return (
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
  )
}
