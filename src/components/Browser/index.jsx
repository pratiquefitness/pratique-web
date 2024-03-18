import { Affix, Typography, Breadcrumb } from 'antd'
import { HomeOutlined, DoubleRightOutlined } from '@ant-design/icons'
import Header from '@/layout/Header'
import React from 'react'
import { routes } from '@/constants'
import Navigation from '@/layout/Navigation'

const { Title } = Typography

const listaLinks = [
  {
    path: 'https://www.clubecertosaude.com.br/saude/saversaude/',
    title: 'Saver Saúde'
  },
  {
    path: 'https://pratiquefitness.my.canva.site/site-saver-club-whatsapp',
    title: 'Saver Club Whatsapp'
  },
  {
    path: 'https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique',
    title: 'Clube Certo'
  },
  {
    path: 'https://grupopratique.typeform.com/cadas-desconto',
    title: 'iGreen Energy'
  },
  {
    path: 'https://www.bolsamaisbrasil.com.br/unipower/bolsas',
    title: 'Bolsa Brasil'
  },
  {
    path: 'https://pratiquefitness.com.br/',
    title: 'Pratique Fitness'
  },
  {
    path: 'https://pratiquefitness.com.br/trabalhe-na-academia-pratique/',
    title: 'Trabalhe na Pratique'
  },
  {
    path: 'https://pratiquefitness.com.br/sobre-a-pratique/',
    title: 'Sobre a Pratique'
  },
  {
    path: 'https://pratiquefitness.com.br/pratiquenutri/',
    title: 'Pratique Nutri'
  }
]

const Browser = ({ url, onClose }) => {

  const breadcrumblist = [
    {
      title: <HomeOutlined />,
      onClick: onClose
    }
  ]

  return url ? (
    <div className="browser-container">
      {url !== 'https://pratiquefitness.com.br/blog/' && (
        <>
          <Header />
          {listaLinks.map(({ path, title }) => {
            if (path === url) {
              breadcrumblist.push({
                title: title
              })
            }
          })}
          <div className="d-flex py-2 justify-space-between">
            <Breadcrumb
              separator={<DoubleRightOutlined className="" />}
              className="ml-2 text-capitalize d-flex items-center"
              items={breadcrumblist}
            />
          </div>
        </>
      )}
      <iframe target="_self" className={url === 'https://pratiquefitness.com.br/blog/' ? "browser-iframe-blog" : "browser-iframe"} src={url} />
      <Affix offsetBottom={12}>
        <Navigation data={routes} />
      </Affix>
    </div>
  ) : null
}

export default Browser
