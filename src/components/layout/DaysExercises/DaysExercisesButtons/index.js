import { ContainerButtons, WrapperButtons, Buttons, Circle } from "./style";

import Title from "../../Title";

import SadFace from "../../../assets/icones/fitday/sad-face.svg";
import HappyFace from "../../../assets/icones/fitday/happy-face.svg";
import SmileyFace from "../../../assets/icones/fitday/smiley-face.svg";
import { useState } from "react";

function DaysExercisesButtons({ select }) {
  const [selected, setSelected] = useState("");
  const dif = {
    dificeis: 9,
    faceis: 5,
    adequados: 3,
  };
  const selectDificuldade = (event) => {
    event.preventDefault();
    if (selected === event.currentTarget.value) {
      setSelected("");
      select("");
      return;
    }
    setSelected(event.currentTarget.value);
    select(dif[event.currentTarget.value]);
  };

  return (
    <ContainerButtons>
      <Title title="Como estão os exercícios?" />
      <WrapperButtons>
        <Buttons
          selected={selected === "dificeis"}
          value="dificeis"
          onClick={selectDificuldade}
        >
          <div>
            <Circle>
              <img src={SadFace} alt="" />
            </Circle>
            <p>Difíceis</p>
          </div>
        </Buttons>
        <Buttons
          selected={selected === "faceis"}
          value="faceis"
          onClick={selectDificuldade}
        >
          <div>
            <Circle>
              <img src={HappyFace} alt="" />
            </Circle>
            <p>Fáceis</p>
          </div>
        </Buttons>
        <Buttons
          selected={selected === "adequados"}
          value="adequados"
          onClick={selectDificuldade}
        >
          <div>
            <Circle>
              <img src={SmileyFace} alt="" />
            </Circle>
            <p>Adequados</p>
          </div>
        </Buttons>
      </WrapperButtons>
    </ContainerButtons>
  );
}

export default DaysExercisesButtons;
