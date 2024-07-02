import { Button, Card, Space } from 'antd'
import { useSelector } from 'react-redux'
import AvatarUploader from './_AvatarUploader'
import MiniCurriculum from './_MiniCurriculum'
import { useRouter } from 'next/router'
import { FaWhatsapp } from 'react-icons/fa'

export default function Contato() {
  const router = useRouter()

  const handleOpenWhatsapp = () => {
    router.push(`https://api.whatsapp.com/send?phone=55${router.query.telefone}&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20gostaria%20de%20falar%20sobre%20seu%20personal.`);
  };

  return (
    <>
      {
        router.query.curriculo.length > 0 ?
          <>
            {router.query.displayName}
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
