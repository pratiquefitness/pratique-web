import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItem from './_CarouselItem'

const listaCarousel = [
  {
    href: '/aulas_coletivas/jump',
    image: '/images/banner_home/vertical_banner/energy_jump2.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/intensivejump',
    image: '/images/banner_home/vertical_banner/intensive_jump.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/powerdance',
    image: '/images/banner_home/vertical_banner/power_dance.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/treinosdiarios',
    image: '/images/banner_home/vertical_banner/treinos_diarios.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/abdominais',
    image: '/images/banner_home/vertical_banner/abdominais.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/fitdance',
    image: '/images/banner_home/vertical_banner/fit_dance.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/flow',
    image: '/images/banner_home/vertical_banner/flow.png',
    isRounded: true
  },
  {
    href: '/aulas_coletivas/queimeacasa',
    image: '/images/banner_home/vertical_banner/queime_casa.png',
    isRounded: true
  }
]

export default function AtividadesOnDemand() {
  return (
    <div>
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
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 575,
              min: 0
            },
            items: 2,
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
        {listaCarousel.map(({href,image,isRounded}, index) => (
          <CarouselItem
            key={index} 
            href={href}
            image={image}
            isRounded={isRounded}
          />
        ))}
      </Carousel>
    </div>
  )
}
