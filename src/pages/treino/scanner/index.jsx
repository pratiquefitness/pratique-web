import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'

export default function ScannerView() {
  return (
    <TreinoLayout>
      <Button shape="round" icon={<DownloadOutlined />} size="large" block>
        Baixar Exame
      </Button>
    </TreinoLayout>
  )
}
