import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from "./_CarouselItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const listaCarousel = [
  {
    href: "/aulas_coletivas/coreografias",
    image: "/images/webp/banner_home/vertical_banner/coreografias-vertical.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/powerdance",
    image: "/images/webp/banner_home/vertical_banner/power-dance-vertical.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/powercore",
    image: "/images/webp/banner_home/vertical_banner/power-core-vertical.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/powerbumbum",
    image: "/images/webp/banner_home/vertical_banner/power_bumbum2.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/treinosdiarios",
    image: "/images/webp/banner_home/vertical_banner/treinos_diarios.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/abdominais",
    image: "/images/webp/banner_home/vertical_banner/abdominais.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/flow",
    image: "/images/webp/banner_home/vertical_banner/flow.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/queime_em_casa",
    image: "/images/webp/banner_home/vertical_banner/queime_casa.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/jump",
    image: "/images/webp/banner_home/vertical_banner/energy_jump2.webp",
    isRounded: true
  },
  {
    href: "/aulas_coletivas/intensivejump",
    image: "/images/webp/banner_home/vertical_banner/intensive_jump.webp",
    isRounded: true
  }
];

export default function AtividadesOnDemand() {
  return (
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
  );
}
