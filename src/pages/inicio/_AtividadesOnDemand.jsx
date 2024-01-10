import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link'

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
        <Link href="/aulas_coletivas/jump">
          <img src="/images/banner_home/vertical_banner/energy_jump2.png" className="w-95" />
        </Link>
        <Link href="/aulas_coletivas/intensivejump">
          <img src="/images/banner_home/vertical_banner/intensive_jump.png" className="w-95" />
        </Link>
        <Link href="/aulas_coletivas/powerdance">
          <img src="/images/banner_home/vertical_banner/power_dance.png" className="w-95" />
        </Link>

        <Link href="/aulas_coletivas/treinosdiarios">
          <img src="/images/banner_home/vertical_banner/treinos_diarios.png" className="w-95" />
        </Link>

        <Link href="/aulas_coletivas/abdominais">
          <img src="/images/banner_home/vertical_banner/abdominais.png" className="w-95" />
        </Link>

        <Link href="/aulas_coletivas/fitdance">
          <img src="/images/banner_home/vertical_banner/fit_dance.png" className="w-95" />
        </Link>

        <Link href="/aulas_coletivas/flow">
          <img src="/images/banner_home/vertical_banner/flow.png" className="w-95" />
        </Link>

        <Link href="/aulas_coletivas/queimeacasa">
          <img src="/images/banner_home/vertical_banner/queime_casa.png" className="w-95" />
        </Link>
      </Carousel>
    </div>
  )
}
