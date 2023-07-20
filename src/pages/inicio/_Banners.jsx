import Loading from '@/components/Loading'
import { getLives } from '@/redux/actions/lives'
import utils from '@/utils'
import { Carousel, Typography, theme } from 'antd'
import { format } from 'date-fns'
import { useEffect } from 'react'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'

const contentStyle = {
  margin: 5,
  height: 160,
  color: 'black',
  borderRadius: 10
}

const settings = {
  className: 'center',
  centerMode: true,
  slidesToShow: 1,
  swipeToSlide: true,
  draggable: true,
  autoplay: false,
  autoplaySpeed: 2000,
  style: {
    marginBottom: 20
  }
}

/*
5 min - em instantes
agora - acontecendo
*/

export default function Banners() {
  const disptach = useDispatch()
  const { token } = theme.useToken()
  const { data, loading } = useSelector(state => state.lives)

  useEffect(() => {
    disptach(getLives())
  }, [])

  return (
    <Loading spinning={loading}>
      {data.length ? (
        <Carousel {...settings}>
          {data.map((live, key) => {
            const dia = format(new Date(live.live_datagravacao), 'dd')
            const mes = format(new Date(live.live_datagravacao), 'MM')
            return (
              <div key={key}>
                <div style={{ background: `url(${live.live_link})`, backgroundSize: 'cover', ...contentStyle }}>
                  <div className="p-4">
                    <h3>
                      {`${dia} de ${utils.getMonthNames(mes).name} `}
                      <small>às {live.live_horagravacao}H</small>
                    </h3>
                    <h2 style={{ color: token.colorPrimary }}>{live.live_nome}</h2>
                    <p>
                      <Countdown
                        date={Date.now() + 5000000}
                        renderer={({ hours, minutes, seconds, completed }) => {
                          return (
                            <span>
                              Em: {hours}h {minutes}m {seconds}s
                            </span>
                          )
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Carousel>
      ) : null}
    </Loading>
  )
}
