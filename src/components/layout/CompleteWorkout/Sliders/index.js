import React, { useState } from "react";
import BtnSlider from "./BtnSlider";
import Image from "../../../assets/image/image-slider.png";
import { Colors } from "../../../assets/colors";
import {
  BallsContainer,
  Container,
  DoneButton,
  InactiveSlide,
  Slide,
  SlideContainer,
  SlideNumberBall,
} from "./style";
import { useRef } from "react";
import { useEffect } from "react";

export default function Slider({ exercicios, next, finalizar }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const nextRef = useRef(null);
  const slidersRef = useRef([]);

  const nextSlide = (e) => {
    e.preventDefault();
    if (slideIndex < exercicios.length - 1) {
      setSlideIndex(slideIndex + 1);
      const nextSlide = slidersRef.current[slideIndex + 1];
      nextSlide.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      next();
      return;
    }
    if (slideIndex === exercicios.length - 1) {
      finalizar(true);
      return;
    }
  };

  const prevSlide = (e) => {
    e.preventDefault();
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(exercicios.length);
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
    slidersRef.current = slidersRef.current.slice(0, exercicios?.length);
  }, [exercicios]);

  return (
    <Container>
      <SlideContainer>
        {exercicios?.map((exercicio, index) => (
          <Slide
            className={getAnim(index)}
            ref={(el) => (slidersRef.current[index] = el)}
          >
            <img src={exercicio?.thumb} alt="" />
            <div className="bottomRow">
              <p className="title">{exercicio?.nome}</p>
              <div className="info">
                <div>
                  <p className="infoTitle">Séries</p>
                  <p>{exercicio?.series}x</p>
                </div>
                <div>
                  <p className="infoTitle">Repetições</p>
                  <p>{exercicio?.repeticoes}</p>
                </div>
                <div>
                  <p className="infoTitle">Descanso</p>
                  <p>{exercicio?.descanco}s</p>
                </div>
              </div>
            </div>
          </Slide>
        ))}
      </SlideContainer>
      <BallsContainer>
        {exercicios?.map((_, i) => (
          <SlideNumberBall active={i === slideIndex} />
        ))}
      </BallsContainer>
      <DoneButton onClick={nextSlide}>
        <p>Feito!</p>
      </DoneButton>
    </Container>
  );
}
