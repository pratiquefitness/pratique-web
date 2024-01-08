import { Dayjs } from 'dayjs'
import { Calendar, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const { Title, Text } = Typography

export default function Calendario() {

  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)

  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
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
      <Calendar onPanelChange={onPanelChange} />
    </>
  )
}
