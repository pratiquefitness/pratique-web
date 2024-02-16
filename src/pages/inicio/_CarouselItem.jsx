import Link from 'next/link'

export default function CarouselItem({ image, action, alt, isRounded, href }) {
  return (
    <>
      {action ? (
        <a onClick={action} className="d-flex justify-center">
          <img src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
        </a>
      ) : (
        <Link href={href} className="d-flex justify-center">
          <img src={image} alt={alt} className={`w-95 ${isRounded && 'rounded-extra'}`} />
        </Link>
      )}
    </>
  )
}
