import React, { useState } from "react";
import {
  BallsContainer,
  Container,
  DoneButton,
  Slide,
  SlideContainer,
  SlideNumberBall,
} from "./style";
import { useRef } from "react";
import { useEffect } from "react";
import StarRatingComponent from "../StarRating";
import Usuarios from "../../../../api/services/Usuarios";

export default function Slider({ instrutores, next, finalizar }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const nextRef = useRef(null);
  const slidersRef = useRef([]);

  const nextSlide = () => {
    if (slideIndex < instrutores.length - 1) {
      setSlideIndex(slideIndex + 1);
      const nextSlide = slidersRef.current[slideIndex + 1];
      nextSlide.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      // next();
      return;
    }
  };

  const prevSlide = (e) => {
    e.preventDefault();
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(instrutores.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const getAnim = (index) => {
    if (index === 0 && slideIndex === 0) {
      return "";
    }
    if (index === slideIndex) {
      return "toNext";
    }
    if (index === slideIndex - 1) {
      return "toPrev inactive";
    }
    if (index < slideIndex) {
      return "inactive";
    }
    if (index > slideIndex) {
      return "inactive";
    }
  };

  useEffect(() => {
    slidersRef.current = slidersRef.current.slice(0, instrutores?.length);
  }, [instrutores]);

  return (
    <Container>
      <SlideContainer>
        {instrutores?.map((instrutor, index) => (
          <Slide
            className={getAnim(index)}
            ref={(el) => (slidersRef.current[index] = el)}
          >
            <img src={instrutor?.avatar} alt="" />
            <p className="title">{instrutor?.nome}</p>
          </Slide>
        ))}
      </SlideContainer>
      <StarRatingComponent
        select={async () => {
          await Usuarios.salvarAvaliacao(instrutores[slideIndex].id);
          nextSlide();
        }}
      />
    </Container>
  );
}
