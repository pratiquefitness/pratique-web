import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

export default function ScannerView() {
  return (
    <Button shape="round" icon={<DownloadOutlined />} size="large" block>
      Download
    </Button>
  )
}
