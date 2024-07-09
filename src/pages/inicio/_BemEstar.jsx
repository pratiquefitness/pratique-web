import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CarouselItem from './_CarouselItem'
import { useDispatch, useSelector } from 'react-redux'


const listaCarousel = [
  {
    href: '/aulas_coletivas/yoga',
    image: '/images/webp/yoga2.webp',
    isRounded: true,
    alt: 'exercicios_yoga'
  },
  {
    href: '/meditacao',
    image: '/images/webp/meditacao.webp',
    isRounded: true,
    alt: 'exercicios_meditacao'
  }
]

export default function BemEstar() {

  const { data, loading } = useSelector(state => state.lives)


  return (
    <>
       {loading ? (
      <>
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={170}
          width={'90%'}
          borderRadius={16}
          inline={true}
          />
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={170}
          width={'6%'}
          inline={true}
          style={{marginLeft: '3%', borderTopLeftRadius: 16, borderBottomLeftRadius: 16}}
          />
        </>
      ) : <>
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
                breakpoint: { max: 3000, min: 1024 },
                items: 3
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
          partialVisibilityGutter: 30
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
      </>
      }
    </>
  )
}
