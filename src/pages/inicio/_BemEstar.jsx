import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItem from './_CarouselItem'

const listaCarousel = [
  {
    href: '/aulas_coletivas/yoga',
    image: '/images/yoga2.png',
    isRounded: true,
    alt: 'exercicios_yoga'
  },
  {
    href: '/meditacao',
    image: '/images/meditacao.png',
    isRounded: true,
    alt: 'exercicios_meditacao'
  }
]

export default function BemEstar() {
  return (
    <div className="">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={false}
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container"
        draggable
        focusOnSelect={false}
        infinite={false}
        keyBoardControl={false}
        minimumTouchDrag={80}
        partialVisible
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            height: 260,
            partialVisibilityGutter: 40,
            slidesToSlide: 2
          },
          mobile: {
            breakpoint: {
              max: 575,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 10
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 40
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {listaCarousel.map(({ href, image, isRounded }, index) => (
          <CarouselItem key={index} href={href} image={image} isRounded={isRounded} />
        ))}
      </Carousel>
    </div>
  )
}
