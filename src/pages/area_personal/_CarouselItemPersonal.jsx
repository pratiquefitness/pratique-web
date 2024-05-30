import { useRouter } from 'next/router'

export default function CarouselItemPersonal({
 image,
 alt,
 isRounded,
 curriculo,
 telefone,
 href,
  id,
 setImageModal,
 setExercicioModal
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push({
      pathname: href,
      query: { curriculo: curriculo, telefone: telefone, image: image}
    }, href)
  }

  return (
    <a onClick={handleClick} className="d-flex justify-center">
      <img src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
    </a>
  )
}
