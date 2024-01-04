import Loading from '@/components/Loading'
import { getLives } from '@/redux/actions/lives'
import utils from '@/utils'
import { Typography, theme } from 'antd'
import { format } from 'date-fns'
import { useEffect } from 'react'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const contentStyle = {
  margin: 5,
  height: 180,
  color: 'black',
  borderRadius: 10,
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white'
}

const settings = {
  className: 'left',
  centerMode: true,
  slidesToShow: 1,
  swipeToSlide: true,
  draggable: true,
  autoplay: false,
  autoplaySpeed: 2000,
  style: {
    marginBottom: 20,
    width: '100%'
  }
}

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
          autoPlay={false}
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
          partialVisible
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
              items: 1,
              partialVisibilityGutter: 40
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
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <div className=''>
            <img src="/images/banner_home/1.png" className='w-95 rounded-extra' />
          </div>
          <div className=''>
            <img src="/images/banner_home/2.png" className='w-95 rounded-extra' />
          </div>
          <div className=''>
            <img src="/images/banner_home/3.png" className='w-95 rounded-extra' />
          </div>
          {/* {data.map((live, key) => {
            const datetime = new Date(`${live.live_datagravacao}T${live.live_horagravacao}:00`)
            if (new Date() >= datetime) {
              return false
            }
            const dia = format(new Date(live.live_datagravacao + 'T00:00:00'), 'dd')
            const mes = format(new Date(live.live_datagravacao + 'T00:00:00'), 'MM')
            return (
              <div key={key}>
                <a href={`https://www.youtube.com/watch?v=${live.live_videoyoutube}`} target="_blank">
                  <div
				  	className='h-40 lg-h-60'
                    style={{ backgroundImage: `url('${live.live_link}')`, backgroundSize: 'cover', ...contentStyle }}
                  >
                    <div className="p-4">
                      <h3>
                        {`${dia} de ${utils.getMonthNames(mes).name} `}
                      </h3>
					  <p><small>às {live.live_horagravacao}H</small></p>
                      <h2 style={{ color: token.colorPrimary }}>{live.live_nome}</h2>
                      <p>
                        <Countdown
                          date={datetime}
                          renderer={({ hours, minutes, seconds, completed }) => {
                            return (
                              <>
                                Começa em: <br />
                                <span style={{ fontWeight: 'bold', fontSize: 20 }}>
                                  {hours}h {minutes}m {seconds}s
                                </span>
                              </>
                            )
                          }}
                        />
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            )
          })} */}
        </Carousel>
      ) : null}
    </Loading>
  )
}
