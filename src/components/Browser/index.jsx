import { Affix, Button, Typography, Breadcrumb } from 'antd'
import { HomeOutlined, UserOutlined,DoubleRightOutlined } from '@ant-design/icons'
import { FaArrowLeft } from 'react-icons/fa'
import Header from '@/layout/Header'
import React from 'react'
import { routes } from '@/constants'
import Navigation from '@/layout/Navigation'

const { Title } = Typography

const Browser = ({ url, onClose }) => {
  return url ? (
    <div className="browser-container">
		
      <Header />
      <div className="container">
       <div className="d-flex py-2 justify-space-between">
          <Breadcrumb
            separator={<DoubleRightOutlined />}
            className="ml-1 text-capitalize d-flex items-center"
            items={[
              {
                title: <HomeOutlined className="text-black" />,
                onClick: () => router.back()
              },
			  url === "https://pratiquefitness.com.br/blog/" ?
              {
                style: 'line-height: 1.7;',
				className:"text-black",
				path: "https://pratiquefitness.com.br/blog/",
                title: "Blog da Pratique"
              }
			  :
			  {
                style: 'line-height: 1.7;',
                title: `${url.substring(21)}`
              }
            ]}
          />
        </div>
        </div>
      <iframe className="browser-iframe" src={url} />
      <Affix offsetBottom={12}>
        <Navigation data={routes} />
      </Affix>
    </div>
  ) : null
}

export default Browser
