import { Button, Empty, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import { useEffect } from 'react'

export default function ScannerView() {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.find(objeto => objeto.urlexame && objeto.urlexame.includes('pdf'))

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  return (
    <TreinoLayout>
      {temExame ? (
        <a href={temExame?.urlexame} target="_blank">
          <Button shape="round" icon={<DownloadOutlined />} size="large" block>
            Baixar Exame
          </Button>
        </a>
      ) : (
        <Empty className="my-8" />
      )}
    </TreinoLayout>
  )
}
