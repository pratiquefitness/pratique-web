import { Button, Typography } from 'antd'
import { FaArrowLeft } from 'react-icons/fa'
import Header from '@/layout/Header'
import React from 'react'

const { Title } = Typography

const Browser = ({ url, onClose }) => {
  return url ? (
    <div className="browser-container">
      <Header />
      <div className="container">
        <div className="d-flex py-2 justify-space-between">
          <Title level={5} className="m-0">
            &nbsp;
          </Title>
          <Button onClick={onClose} size="small" type="text" icon={<FaArrowLeft />}>
            Voltar
          </Button>
        </div>
      </div>
      <iframe className="browser-iframe" src={url} />
    </div>
  ) : null
}

export default Browser