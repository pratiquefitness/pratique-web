import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItemPowerflix from './_CarouselItemPowerflix'

export default function Carrossel({ listaCarousel, setImageModal, setExercicioModal }) {
  return (
    <Carousel
      arrows={false}
      autoPlay={false}
      centerMode={false}
      className="mt-2"
      containerClass="container"
      draggable
      focusOnSelect={false}
      infinite={false}
      keyBoardControl={false}
      minimumTouchDrag={80}
      partialVisible
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      showDots={false}
      slidesToSlide={1}
      swipeable
    >
      {listaCarousel.map(({ href, image, isRounded, alt, setImageModal, setExercicioModal }, index) => (
        <CarouselItemPowerflix
          key={index}
          href={href}
          image={image}
          setImageModal={setImageModal}
          setExercicioModal={setExercicioModal}
          alt={alt}
          isRounded={isRounded}
        />
      ))}
    </Carousel>
  )
}
