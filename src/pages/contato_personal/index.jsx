import { Button, Typography, Space } from 'antd';
import AvatarUploader from './_AvatarUploader';
import MiniCurriculum from './_MiniCurriculum';
import { useRouter } from 'next/router';
import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link'
const {Text} = Typography;

export default function Contato() {
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)

  const handleOpenWhatsapp = () => {
    const whatsappUrl =
      `https://api.whatsapp.com/send?phone=55${router.query.telefone}&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20gostaria%20de%20falar%20sobre%20seu%20personal.`

    if (isMobile) {
      window.location.href = whatsappUrl
      return
    }

    window.open(whatsappUrl, '_blank')
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
                <Text>
                  {router.query.cidade}, {router.query.estado}
                </Text>
                <Text>
                  Instagram:
                  {
                    isMobile ?
                      <Link target={'_blank'} href={`instagram://user?username=${router.query.instagram.replace('@', '')}`}> {router.query.instagram}</Link> :
                      <Link target={'_blank'} href={`https://www.instagram.com/${router.query.instagram.replace('@', '')}/`}> {router.query.instagram}</Link>
                  }
                </Text>
                <Text>
                  Whatsapp: <Link href={`tel:+55${router.query.email}`}>{router.query.telefone}</Link>
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
        <Button icon={<FaWhatsapp fill="#25D366" />} block onClick={handleOpenWhatsapp}>
          Entre em contato comigo
        </Button>
        {/*<a
          href={`https://api.whatsapp.com/send?phone=55${router.query.telefone}&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20gostaria%20de%20falar%20sobre%20seu%20personal.`}
          target="_blank"
        >
          <Button icon={<FaWhatsapp fill="#25D366" />} block>
            Entre em contato comigo
          </Button>
        </a>*/}
      </Space>
    </>
  )
}
