import { Button, Empty, Typography } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useSelector } from 'react-redux'

export default function ScannerView() {
  const { data } = useSelector(state => state.treino)
  const { ficha } = data
  return (
    <TreinoLayout>
      <a href={ficha?.urlexame} target="_blank">
        {ficha?.urlexame.includes('.pdf') ? (
          <Button shape="round" icon={<DownloadOutlined />} size="large" block>
            Baixar Exame
          </Button>
        ) : (
          <Empty className="my-8" />
        )}
      </a>
    </TreinoLayout>
  )
}
