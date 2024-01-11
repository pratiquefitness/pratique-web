import { Affix, Typography, Breadcrumb } from 'antd'
import { HomeOutlined, DoubleRightOutlined } from '@ant-design/icons'
import Header from '@/layout/Header'
import React from 'react'
import { routes } from '@/constants'
import Navigation from '@/layout/Navigation'

const { Title } = Typography

const Browser = ({ url, title, onClose }) => {
  return url ? (
    <div className="browser-container">
      <Header />

      <div className="d-flex py-2 justify-space-between">
        <Breadcrumb
          separator={<DoubleRightOutlined className="" />}
          className="ml-2 text-capitalize d-flex items-center"
          items={[
            {
              title: <HomeOutlined />,
              onClick: onClose
            },
            url === 'https://pratiquefitness.com.br/blog/' && {
              style: 'line-height: 1.7;',
              path: 'https://pratiquefitness.com.br/blog/',
              title: 'Blog da Pratique'
            },
            url === 'https://www.clubecertosaude.com.br/saude/saversaude/' && {
              style: 'line-height: 1.7;',
              path: 'https://www.clubecertosaude.com.br/saude/saversaude/',
              title: 'Saver Saúde'
            },
            url === '' && {
              style: 'line-height: 1.7;',
              title: `${url.substring(21)}`
            }
          ]}
        />
      </div>

      <iframe className="browser-iframe" src={url} />
      <Affix offsetBottom={12}>
        <Navigation data={routes} />
      </Affix>
    </div>
  ) : null
}

export default Browser
