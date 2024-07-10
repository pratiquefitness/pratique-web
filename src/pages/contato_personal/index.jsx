import { Button, Typography, Space, message } from 'antd'
import AvatarUploader from './_AvatarUploader';
import MiniCurriculum from './_MiniCurriculum';
import { useRouter } from 'next/router';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link'
import utils from '@/utils'
const {Text} = Typography;

export default function Contato() {
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  const messageLink = async (text) => {
    await utils.copyTextToClipboard(text)
    message.success('Telefone copiado!')
  }

  return (
    <>
      {
        router.query.curriculo.length > 0 ?
          <>
            <div className="text-left">
              <Space direction={'vertical'}>
                <Text>
                  {router.query.displayName}
                </Text>
                {
                  (router.query.cidade.length !== 0 &&
                  router.query.estado.length !== 0) &&
                    <Text>
                      {router.query.cidade}, {router.query.estado}
                    </Text>
                }
                <Text>
                  Instagram:
                  {
                    isMobile ?
                      <a href={`instagram://user?username=${router.query.instagram.replace('@', '')}`} target="_blank">{router.query.instagram}</a> :
                      <a href={`https://www.instagram.com/${router.query.instagram.replace('@', '')}`} target="_blank">{router.query.instagram}</a>
                  }
                </Text>
                <Text>
                  Telefone:
                  <Text
                    style={{
                      color: '#1677ff',
                      textDecoration: 'underline',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s'
                    }}
                    onClick={() => messageLink(router.query.telefone)}
                  >
                    {router.query.telefone}
                  </Text>
                </Text>
                <Text>
                  e-mail: <Link href={`mailto:${router.query.email}`}>{router.query.email}</Link>
                </Text>
              </Space>
            </div>
            <div className={'d-flex justify-space-between mb-4'}>
              <Space size={'large'}>
                <AvatarUploader props={router.query.image} />
                <MiniCurriculum props={router.query.curriculo} />
              </Space>
            </div>
          </>
          :
          <div className={'mb-4'}>
            <Space size={'large'}>
              <AvatarUploader props={router.query.image} />
            </Space>
          </div>
      }

      <Space direction="vertical" className="w-100 mt-6">
        <a
          href={`https://api.whatsapp.com/send?phone=55${router.query.telefone.replace(/[^0-9a-zA-Z]/g, "")}&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20gostaria%20de%20falar%20sobre%20seu%20personal.`}
          target="_blank"
        >
          <Button icon={<FaWhatsapp fill="#25D366" />} block>
            Entre em contato comigo
          </Button>
        </a>
      </Space>
    </>
  )
}
