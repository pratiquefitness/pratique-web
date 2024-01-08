import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Link from 'next/link'

export default function NewContent() {
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
        <div>
          <img src="/images/banner_home/vertical_banner/intensive_jump.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/power_dance.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/power_training_woman.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/treinos_diarios.png" className="w-95" />
        </div>
      </Carousel>
    </div>
  )
}
