import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useSelector } from 'react-redux'

export default function ScannerView() {
  const { data } = useSelector(state => state.treino)
  const { ficha } = data
  return (
    <TreinoLayout>
      <a href={ficha?.urlexame} target="_blank">
        <Button shape="round" icon={<DownloadOutlined />} size="large" block>
          Baixar Exame
        </Button>
      </a>
    </TreinoLayout>
  )
}
