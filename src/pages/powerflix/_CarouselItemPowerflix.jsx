export default function CarouselItemPowerflix({ image, alt, isRounded, href, setImageModal, setExercicioModal }) {
  const handleClick = () => {
    setImageModal(alt)
    setExercicioModal(true)
  }
  return (
    <a onClick={handleClick} className="d-flex justify-center">
      <img src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
    </a>
  )
}
