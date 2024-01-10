import Link from 'next/link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'

export default function BemEstar() {
  const dispatch = useDispatch()
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
        {/* <Link href="/aulas_coletivas/jump">
          <img src="/images/banner_home/energy_jump.png" className="w-95 rounded-xl" alt="exercicios_jump"/>
        </Link> */}
        <Link href="/aulas_coletivas/yoga">
          <img src="/images/yoga2.png" className="w-95 rounded-xl" alt="exercicios_yoga" />
        </Link>

        <Link href="/meditacao">
          <img src="/images/meditacao.png" className='rounded-xl w-95' />
        </Link>

      </Carousel>
    </div>
  )
}
