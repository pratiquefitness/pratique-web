import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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
            items: 2,
            height: 260,
            partialVisibilityGutter: 40,
            slidesToSlide: 2
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
        <div>
          <img src="/images/banner_home/vertical_banner/1.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/2.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/3.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/4.png" className="w-95" />
        </div>
        <div>
          <img src="/images/banner_home/vertical_banner/5.png" className="w-95" />
        </div>
      </Carousel>
    </div>
  )
}