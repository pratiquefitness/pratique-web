import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItemPowerflix from './_CarouselItemPowerflix'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'

export default function Carrossel({ listaCarousel, setImageModal, setExercicioModal }) {

  const { data, loading } = useSelector(state => state.lives)

  return (
    <>
      {loading ? (
      <>
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={270}
          width={'41%'}
          borderRadius={20}
          inline={true}
          />
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={270}
          width={'41%'}
          borderRadius={20}
          inline={true}
          style={{marginLeft: '3%'}}
          />
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={270}
          width={'12%'}
          inline={true}
          style={{marginLeft: '3%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}
          />
        </>
      ) : <>
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
      </>
      }
</>
  )
}
