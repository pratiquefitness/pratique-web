import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function CarouselItemPersonal({
  image,
  alt,
  isRounded,
  curriculo,
  telefone,
  href,
  displayName,
  instagram,
  cidade,
  estado,
  email,
  id,
  setImageModal,
  setExercicioModal
}) {

  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 464)
    }

    handleResize() // Verifica o tamanho da janela na montagem do componente
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClick = () => {
    router.push(
      {
        pathname: href,
        query: { curriculo, telefone, image, displayName, instagram, cidade, estado, email }
      },
      href
    )
  }

  return (
    <a onClick={handleClick} className="d-flex justify-center">
      <div className="image-wrapper">
        <Image
          src={image}
          alt={alt}
          layout="fill"
          className={`w-95 ${isRounded ? 'rounded-extra' : ''}`}
          objectFit="cover"
          quality={100}
        />
        <div className="overlay text-white d-flex justify-center align-center">
          {displayName}
        </div>
      </div>
      <style jsx>{`
        .image-wrapper {
          position: relative;
          width: 100%;
          height: ${isMobile ? '200px' : '300px'}; // 300px ou qualquer altura desejada para desktop
        }
        .rounded-extra {
          border-radius: 50%;
        }
      `}</style>
    </a>
  )
}
