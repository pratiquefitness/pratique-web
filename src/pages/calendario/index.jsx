import { Dayjs } from 'dayjs'
import { Badge, Calendar, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Button } from 'antd/lib'
import { useState } from 'react'

const { Title, Text } = Typography

const getListData = value => {
  let listData
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.'
        },
        {
          type: 'success',
          content: 'This is usual event.'
        }
      ]
      break
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.'
        },
        {
          type: 'success',
          content: 'This is usual event.'
        },
        {
          type: 'error',
          content: 'This is error event.'
        }
      ]
      break
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event'
        },
        {
          type: 'success',
          content: 'This is very long usual event......'
        },
        {
          type: 'error',
          content: 'This is error event 1.'
        },
        {
          type: 'error',
          content: 'This is error event 2.'
        },
        {
          type: 'error',
          content: 'This is error event 3.'
        },
        {
          type: 'error',
          content: 'This is error event 4.'
        }
      ]
      break
    default:
  }
  return listData || []
}

const listAulas = {
  0: {
    dia: '11',
    mes: 'janeiro',
    aula: 'musculação',
    horario: '11/01/2024 16:00',
    local: 'pratique cidade nova',
    cidade: 'Belo Horizonte'
  },
  1: {
    dia: '11',
    mes: 'janeiro',
    horario: '11/01/2024 18:00',
    aula: 'musculação',
    local: 'pratique cidade nova',
    cidade: 'Belo Horizonte'
  },
  2: {
    dia: '12',
    mes: 'janeiro',
    aula: 'musculação',
    horario: '11/01/2024 16:00',
    local: 'pratique cidade nova',
    cidade: 'Belo Horizonte'
  },
  3: {
    dia: '13',
    mes: 'janeiro',
    horario: '11/01/2024 18:00',
    aula: 'musculação',
    local: 'pratique cidade nova',
    cidade: 'Belo Horizonte'
  }
}

export default function Calendario() {
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)

  const [retorno, setRetorno] = useState("vazio")

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  const monthCellRender = value => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const dateCellRender = value => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: 'https://developer.mozilla.org'
  }

  const btn = document.querySelector('button')
  const resultPara = document.querySelector('.result')

  const shareLink = async () => {
    try {
      await navigator.share(shareData);
      setRetorno('MDN shared successfully');
    } catch (err) {
      setRetorno(`Error: ${err}`);
    }
  }

  return (
    <>
      <div>
        <Title level={4} className="m-0 mt-6">
          Agende suas aulas
        </Title>

        {/* lista de eventos  */}

        {/* <Text type="secondary">Nossos canais de atendimento</Text> */}
      </div>

      {/* <Carousel
        arrows={false}
        autoPlay={false}
        centerMode={false}
        className="mt-2"
        containerClass="container"
        draggable
        focusOnSelect={false}
        infinite={false}
        keyBoardControl={false}
        minimumTouchDrag={80}
        partialVisible
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            height: 260,
            partialVisibilityGutter: 40,
            slidesToSlide: 2
          },
          mobile: {
            breakpoint: {
              max: 575,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 80
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
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        
      </Carousel> */}

      <div className="d-flex justify-center my-14">
        <Button onClick={shareLink} >Share MDN!</Button>
      </div>
      <div className="d-flex justify-center my-14">
        <p>{retorno}</p>
      </div>

      <Calendar onPanelChange={onPanelChange} cellRender={cellRender} />
    </>
  )
}
