import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItemPersonal from './_CarouselItemPersonal'

export default function Carrossel({ listaCarousel, setImageModal, setExercicioModal }) {
  return (
    <>
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
          breakpoint: { max: 3000, min: 993 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 992, min: 465 },
          items: 2,
          partialVisibilityGutter: 60
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          partialVisibilityGutter: 10
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      showDots={false}
      slidesToSlide={1}
      swipeable
    >
      {listaCarousel.map(({
        href,
        image,
        isRounded,
        alt,
        setImageModal,
        setExercicioModal,
        curriculo,
        telefone,
        display_name
      }, index) =>  (
          index % 2 === 0 &&
          <CarouselItemPersonal
            key={index}
            href={href}
            image={image}
            setImageModal={setImageModal}
            setExercicioModal={setExercicioModal}
            alt={alt}
            isRounded={isRounded}
            curriculo={curriculo}
            telefone={telefone}
            displayName={display_name}
          />
        )
      )}
    </Carousel>
    <br />
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
          breakpoint: { max: 3000, min: 993 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 992, min: 465 },
          items: 2,
          partialVisibilityGutter: 60
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          partialVisibilityGutter: 10
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      showDots={false}
      slidesToSlide={1}
      swipeable
    >
      {listaCarousel.map(({
        href,
        image,
        isRounded,
        alt,
        setImageModal,
        setExercicioModal,
        curriculo,
        telefone,
        display_name
      }, index) => (
        index % 2 !== 0 &&
        <CarouselItemPersonal
          key={index}
          href={href}
          image={image}
          setImageModal={setImageModal}
          setExercicioModal={setExercicioModal}
          alt={alt}
          isRounded={isRounded}
          curriculo={curriculo}
          telefone={telefone}
          displayName={display_name}
        />
      ))}
    </Carousel>
    </>
  )
}
