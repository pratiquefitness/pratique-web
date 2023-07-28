import { Button, Empty, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useSelector } from 'react-redux'

export default function ScannerView() {
  const { data } = useSelector(state => state.treino)
  const { ficha, fichas } = data

  const temExame = fichas.find(objeto => objeto.urlexame.includes('pdf'))

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
