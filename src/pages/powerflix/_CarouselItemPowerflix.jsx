import { useRouter } from 'next/router';

export default function CarouselItemPowerflix({ image, alt, isRounded, href, nomeFichaPre, setImageModal, setExercicioModal }) {
	const router = useRouter();
	const handleClick = () => {
		router.push({
			pathname: href,
			query: {nome: nomeFichaPre}
		}, href);
	};
  return (
    <a onClick={handleClick} className="d-flex justify-center">
      <img src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
    </a>
  )
}
