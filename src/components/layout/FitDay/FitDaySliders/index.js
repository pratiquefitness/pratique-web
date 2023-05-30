import {
  Buttons,
  ButtonTitle,
  ContainerButtons,
  ContainerRow,
  SelectionIcon,
  SelectionText,
  SelectionWrapper,
  Slider,
  SliderContainer,
} from "./style";

import SadFace from "../../../assets/icones/fitday/sad-face.svg";
import HappyFace from "../../../assets/icones/fitday/happy-face.svg";
import SmileyFace from "../../../assets/icones/fitday/smiley-face.svg";
import { useEffect, useState } from "react";

function FitDaySliders({ select }) {
  const [sono, setSono] = useState(3);
  const [alimentacao, setAlimentacao] = useState(3);
  const [disposicao, setDisposicao] = useState(3);
  const [mental, setMental] = useState(3);

  useEffect(() => {
    select("sono", sono);
    select("alimentacao", alimentacao);
    select("disposicao", disposicao);
    select("mental", mental);
  }, []);

  return (
    <ContainerButtons>
      <ContainerRow>
        <Buttons>
          <ButtonTitle>Como está o seu sono?</ButtonTitle>
          <SliderContainer>
            <Slider
              value={sono}
              onChange={(e) => (
                select("sono", e.target.value), setSono(e.target.value)
              )}
              type="range"
              step={1}
              min={1}
              max={5}
            />
          </SliderContainer>
          <SelectionWrapper>
            <SelectionIcon
              src={sono <= 2 ? SadFace : sono == 3 ? HappyFace : SmileyFace}
              alt=""
            />
            <SelectionText>Dormi bem, me sinto recuperado</SelectionText>
          </SelectionWrapper>
        </Buttons>
        <Buttons>
          <ButtonTitle>Como está a sua alimentação?</ButtonTitle>
          <SliderContainer>
            <Slider
              value={alimentacao}
              onChange={(e) => (
                select("alimentacao", e.target.value),
                setAlimentacao(e.target.value)
              )}
              type="range"
              step={1}
              min={1}
              max={5}
            />
          </SliderContainer>
          <SelectionWrapper>
            <SelectionIcon
              src={
                alimentacao <= 2
                  ? SadFace
                  : alimentacao == 3
                  ? HappyFace
                  : SmileyFace
              }
              alt=""
            />
            <SelectionText>Não comi bem e bebi pouca água</SelectionText>
          </SelectionWrapper>
        </Buttons>
      </ContainerRow>
      <ContainerRow>
        <Buttons>
          <ButtonTitle>Como está a sua disposição física?</ButtonTitle>
          <SliderContainer>
            <Slider
              value={disposicao}
              onChange={(e) => (
                select("fisica", e.target.value), setDisposicao(e.target.value)
              )}
              type="range"
              step={1}
              min={1}
              max={5}
            />
          </SliderContainer>
          <SelectionWrapper>
            <SelectionIcon
              src={
                disposicao <= 2
                  ? SadFace
                  : disposicao == 3
                  ? HappyFace
                  : SmileyFace
              }
              alt=""
            />
            <SelectionText>Não sinto cansaço ou dores</SelectionText>
          </SelectionWrapper>
        </Buttons>
        <Buttons>
          <ButtonTitle>Como está a sua saúde mental?</ButtonTitle>
          <SliderContainer>
            <Slider
              value={mental}
              onChange={(e) => (
                select("mental", e.target.value), setMental(e.target.value)
              )}
              type="range"
              step={1}
              min={1}
              max={5}
            />
          </SliderContainer>
          <SelectionWrapper>
            <SelectionIcon
              src={mental <= 2 ? SadFace : mental == 3 ? HappyFace : SmileyFace}
              alt=""
            />
            <SelectionText>Não comi bem e bebi pouca água</SelectionText>
          </SelectionWrapper>
        </Buttons>
      </ContainerRow>
    </ContainerButtons>
  );
}

export default FitDaySliders;
