import { useRouter } from 'next/router'
import Image from 'next/image'

export default function CarouselItemPersonal({
 image,
 alt,
 isRounded,
 curriculo,
 telefone,
 href,
 displayName,
  id,
 setImageModal,
 setExercicioModal
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push({
      pathname: href,
      query: { curriculo: curriculo, telefone: telefone, image: image, displayName: displayName}
    }, href)
  }

  return (
    <a onClick={handleClick} className="d-flex justify-center">
      <Image
        width={300}
        height={300}
        src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
    </a>
  )
}
