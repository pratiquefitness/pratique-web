import Loading from '@/components/Loading'
import { getLives } from '@/redux/actions/lives'
import { theme } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link'

/*
5 min - em instantes
agora - acontecendo
*/

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
          //partialVisible
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 2,
              height: 260,
              partialVisibilityGutter: 40,
              slidesToSlide: 2
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              height: 400,
              items: 1
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 2,
              partialVisibilityGutter: 40
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
          <Link href="/aulas_coletivas/abdominais" className="d-flex justify-center">
            <img src="/images/banner_home/treino_em_casa.png" className="w-100 rounded-extra " />
          </Link>
          <Link href="/aulas_coletivas/abdominais" className="d-flex justify-center">
            <img src="/images/banner_home/abdominais.png" className="w-100 rounded-extra" />
          </Link>
          <Link href="/aulas_coletivas/queimeacasa" className="d-flex justify-center">
            <img src="/images/banner_home/queime_casa.png" className="w-100 rounded-extra" />
          </Link>
        </Carousel>
      ) : null}
    </Loading>
  )
}
